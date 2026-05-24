const request = require('supertest');
const app = require('../index');
const db = require('../database');

describe('GET /api/patients/:id', () => {
    let patientId;

    beforeAll((done) => {
        // Insert a dummy patient
        db.run("INSERT INTO users (name, phone, role) VALUES ('Test Patient 2', '77222222', 'patient')", function(err) {
            if (err) done(err);
            patientId = this.lastID;
            done();
        });
    });

    afterAll((done) => {
        db.run("DELETE FROM users WHERE id = ?", [patientId], (err) => {
            if (err) done(err);
            // Close the DB to allow Jest to exit cleanly
            db.close((err) => {
                if (err) console.error(err);
                done();
            });
        });
    });

    it('should return a patient when a valid ID is provided', async () => {
        const res = await request(app).get(`/api/patients/${patientId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', patientId);
        expect(res.body).toHaveProperty('name', 'Test Patient 2');
        expect(res.body).toHaveProperty('phone', '77222222');
        expect(res.body).toHaveProperty('role', 'patient');
    });

    it('should return 404 when patient does not exist', async () => {
        const res = await request(app).get('/api/patients/999999');
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'Patient not found');
    });

    it('should return 404 if the user is not a patient', async () => {
        // Insert a nurse to test this
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO users (name, phone, role) VALUES ('Test Nurse', '77333333', 'nurse')", function(err) {
                if (err) return reject(err);
                const nurseId = this.lastID;

                request(app)
                    .get(`/api/patients/${nurseId}`)
                    .then(res => {
                        expect(res.statusCode).toBe(404);
                        expect(res.body).toHaveProperty('error', 'Patient not found');

                        db.run("DELETE FROM users WHERE id = ?", [nurseId], (err) => {
                            if (err) reject(err);
                            resolve();
                        });
                    });
            });
        });
    });

    it('should return 500 on database error', async () => {
        // Force a DB error by modifying the database object temporarily
        const originalGet = db.get;
        db.get = jest.fn((query, params, cb) => {
            cb(new Error('Database forced error'), null);
        });

        const res = await request(app).get(`/api/patients/${patientId}`);
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error', 'Internal server error');

        // Restore original db.get
        db.get = originalGet;
    });
});
