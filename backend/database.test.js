const path = require('path');

// Mock console.error to capture output
const originalConsoleError = console.error;
const originalConsoleLog = console.log;
let consoleErrorOutput = [];
let consoleLogOutput = [];

beforeAll(() => {
    console.error = (...args) => {
        consoleErrorOutput.push(args);
    };
    console.log = (...args) => {
        consoleLogOutput.push(args);
    };
});

afterAll(() => {
    console.error = originalConsoleError;
    console.log = originalConsoleLog;
});

beforeEach(() => {
    consoleErrorOutput = [];
    consoleLogOutput = [];
    jest.resetModules(); // Important to get a fresh instance of database.js each time
});

test('handles database connection error gracefully', () => {
    const mockError = new Error('Mock connection error');

    // We need to spy on or mock sqlite3.Database
    jest.mock('sqlite3', () => {
        const mockDatabase = jest.fn(function(path, cb) {
            // Must use setTimeout to allow db variable to be assigned before cb is called
            setTimeout(() => {
                cb(mockError);
            }, 0);
            return {
                run: jest.fn(),
                get: jest.fn()
            };
        });

        return {
            verbose: jest.fn(() => ({
                Database: mockDatabase
            }))
        };
    });

    const db = require('./database');

    return new Promise(resolve => setTimeout(resolve, 10)).then(() => {
        expect(consoleErrorOutput.length).toBeGreaterThan(0);
        expect(consoleErrorOutput[0]).toContain('Error opening database');
        expect(consoleErrorOutput[0]).toContain(mockError.message);
    });
});

test('handles database connection success gracefully', () => {
    jest.mock('sqlite3', () => {
        const mockDatabase = jest.fn(function(path, cb) {
            setTimeout(() => {
                cb(null);
            }, 0);
            return {
                run: jest.fn((query, cb2) => {
                    if (cb2) cb2(null);
                }),
                get: jest.fn((query, cb2) => {
                    cb2(null, {count: 1}); // Return count > 0 to skip inserts
                })
            };
        });

        return {
            verbose: jest.fn(() => ({
                Database: mockDatabase
            }))
        };
    });

    const db = require('./database');

    return new Promise(resolve => setTimeout(resolve, 10)).then(() => {
        expect(consoleLogOutput.length).toBeGreaterThan(0);
        expect(consoleLogOutput[0]).toContain('Connected to the SQLite database.');
    });
});

test('inserts dummy users when count is 0', () => {
    let runCalls = [];
    jest.mock('sqlite3', () => {
        const mockDatabase = jest.fn(function(path, cb) {
            setTimeout(() => {
                cb(null);
            }, 0);
            return {
                run: jest.fn((query, cb2) => {
                    runCalls.push(query);
                    if (cb2) cb2(null);
                }),
                get: jest.fn((query, cb2) => {
                    cb2(null, {count: 0}); // Return count = 0 to trigger inserts
                })
            };
        });

        return {
            verbose: jest.fn(() => ({
                Database: mockDatabase
            }))
        };
    });

    const db = require('./database');

    return new Promise(resolve => setTimeout(resolve, 10)).then(() => {
        expect(consoleLogOutput).toEqual(expect.arrayContaining([
            expect.arrayContaining(['Dummy users inserted'])
        ]));
        // Should have create table statements + insert statements
        const insertCalls = runCalls.filter(q => q.includes('INSERT INTO users'));
        expect(insertCalls.length).toBe(2);
    });
});
