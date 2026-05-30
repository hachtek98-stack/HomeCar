const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'homecar.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Create Users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL UNIQUE,
            role TEXT NOT NULL CHECK(role IN ('patient', 'nurse')),
            pushToken TEXT
        )`);

        // Create Requests table
        db.run(`CREATE TABLE IF NOT EXISTS requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patientId INTEGER NOT NULL,
            nurseId INTEGER,
            prescriptionImage TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            paymentPhone TEXT,
            latitude REAL,
            longitude REAL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(patientId) REFERENCES users(id),
            FOREIGN KEY(nurseId) REFERENCES users(id)
        )`);

        // ⚡ Bolt: Add indices to optimize querying requests table by status and roles
        db.run(`CREATE INDEX IF NOT EXISTS idx_requests_patient ON requests(patientId)`);
        db.run(`CREATE INDEX IF NOT EXISTS idx_requests_nurse ON requests(nurseId)`);
        db.run(`CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status)`);

        // Insert some dummy users if none exist
        db.get("SELECT count(*) as count FROM users", (err, row) => {
            if (row && row.count === 0) {
                db.run("INSERT INTO users (name, phone, role) VALUES ('Patient Test', '77000000', 'patient')");
                db.run("INSERT INTO users (name, phone, role) VALUES ('Infirmier Test', '77111111', 'nurse')");
                console.log('Dummy users inserted');
            }
        });
    }
});

module.exports = db;
