const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
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
        if (err) return res.status(500).json({ error: err.message });

        if (row) {
            // User exists
            res.json(row);
        } else {
            // Register new user (mocking name for simplicity)
            const name = role === 'patient' ? 'Patient ' + phone : 'Infirmier ' + phone;
            db.run(`INSERT INTO users (name, phone, role) VALUES (?, ?, ?)`, [name, phone, role], function(err) {
                if (err) return res.status(500).json({ error: err.message });
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

// 2. Create a Request
app.post('/api/requests', (req, res) => {
    const { patientId, prescriptionImage } = req.body;

    if (!patientId || !prescriptionImage) {
        return res.status(400).json({ error: 'patientId and prescriptionImage are required' });
    }

    db.run(
        `INSERT INTO requests (patientId, prescriptionImage) VALUES (?, ?)`,
        [patientId, prescriptionImage],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });

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
        if (err) return res.status(500).json({ error: err.message });
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
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Request not found or already paid' });

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
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Request not found or already accepted' });

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
