const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Expo } = require('expo-server-sdk');
const db = require('./database');

const app = express();
const expo = new Expo();

// Helper to send push notifications
const sendPushNotification = async (somePushTokens, message) => {
    let messages = [];
    for (let pushToken of somePushTokens) {
        if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
            continue;
        }
        messages.push({
            to: pushToken,
            sound: 'default',
            body: message,
            data: { withSome: 'data' },
        });
    }

    let chunks = expo.chunkPushNotifications(messages);
    for (let chunk of chunks) {
        try {
            await expo.sendPushNotificationsAsync(chunk);
        } catch (error) {
            console.error('Error sending push notification:', error);
        }
    }
};
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
// Increase payload limit for base64 image strings if needed
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// --- ROUTES ---

// 1. Auth: Login or Register based on phone
app.post('/api/login', (req, res) => {
    const { phone, role } = req.body;

    if (!phone || !role) {
        return res.status(400).json({ error: 'Phone and role are required' });
    }

    // Try to find the user
    db.get(`SELECT * FROM users WHERE phone = ? AND role = ?`, [phone, role], (err, row) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (row) {
            // User exists
            res.json(row);
        } else {
            // Register new user (mocking name for simplicity)
            const name = role === 'patient' ? 'Patient ' + phone : 'Infirmier ' + phone;
            db.run(`INSERT INTO users (name, phone, role) VALUES (?, ?, ?)`, [name, phone, role], function(err) {
                if (err) {
                    console.error('Database error:', err.message);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                res.json({
                    id: this.lastID,
                    name,
                    phone,
                    role
                });
            });
        }
    });
});

// 1.5 Update Push Token
app.post('/api/users/:id/token', (req, res) => {
    const { id } = req.params;
    const { pushToken } = req.body;

    db.run(`UPDATE users SET pushToken = ? WHERE id = ?`, [pushToken, id], function(err) {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json({ success: true });
    });
});

// 2. Create a Request
app.post('/api/requests', (req, res) => {
    const { patientId, prescriptionImage, latitude, longitude } = req.body;

    if (!patientId || !prescriptionImage) {
        return res.status(400).json({ error: 'patientId and prescriptionImage are required' });
    }

    db.run(
        `INSERT INTO requests (patientId, prescriptionImage, latitude, longitude) VALUES (?, ?, ?, ?)`,
        [patientId, prescriptionImage, latitude, longitude],
        function(err) {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Internal server error' });
            }

            db.get(`SELECT * FROM requests WHERE id = ?`, [this.lastID], (err, row) => {
                res.json(row);
            });
        }
    );
});

// 3. Get Requests (Different filters based on user role handled by client or server)
app.get('/api/requests', (req, res) => {
    const patientId = req.query.patientId;

    let query = `
        SELECT r.*, u.phone as patientPhone
        FROM requests r
        JOIN users u ON r.patientId = u.id
    `;
    let params = [];

    if (patientId) {
        query += ` WHERE r.patientId = ?`;
        params.push(patientId);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});

// 4. Pay for a Request
app.put('/api/requests/:id/pay', (req, res) => {
    const { id } = req.params;
    const { paymentPhone } = req.body;

    if (!paymentPhone) {
        return res.status(400).json({ error: 'paymentPhone is required' });
    }

    db.run(
        `UPDATE requests SET status = 'paid', paymentPhone = ? WHERE id = ? AND status = 'pending'`,
        [paymentPhone, id],
        function(err) {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (this.changes === 0) return res.status(404).json({ error: 'Request not found or already paid' });

            // Notify nurses about the new paid request
            db.all(`SELECT pushToken FROM users WHERE role = 'nurse' AND pushToken IS NOT NULL`, [], (err, rows) => {
                if (!err && rows.length > 0) {
                    const tokens = rows.map(r => r.pushToken);
                    sendPushNotification(tokens, "Nouvelle demande de prélèvement disponible !");
                }
            });

            res.json({ success: true, message: 'Payment recorded' });
        }
    );
});

// 5. Accept a Request
app.put('/api/requests/:id/accept', (req, res) => {
    const { id } = req.params;
    const { nurseId } = req.body;

    if (!nurseId) {
        return res.status(400).json({ error: 'nurseId is required' });
    }

    db.run(
        `UPDATE requests SET status = 'confirmed', nurseId = ? WHERE id = ? AND status = 'paid'`,
        [nurseId, id],
        function(err) {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (this.changes === 0) return res.status(404).json({ error: 'Request not found or already accepted' });

            // Notify patient that a nurse accepted
            db.get(`
                SELECT u.pushToken
                FROM requests r
                JOIN users u ON r.patientId = u.id
                WHERE r.id = ? AND u.pushToken IS NOT NULL
            `, [id], (err, row) => {
                if (!err && row && row.pushToken) {
                    sendPushNotification([row.pushToken], "Un infirmier a accepté votre demande et est en route !");
                }
            });

            res.json({ success: true, message: 'Request accepted' });
        }
    );
});

app.get('/', (req, res) => {
    res.json({ message: "Welcome to HomeCar API" });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
