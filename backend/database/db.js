const sqlite3 = require("sqlite3").verbose();

const isTest = process.env.NODE_ENV === "test";
const dbFile = isTest ? ":memory:" : "database.db";

const db = new sqlite3.Database(dbFile, (err) => {
  if (err) console.error("Error opening database:", err.message);
  else console.log(`Connected to SQLite database (${isTest ? "Test Mode" : "Production Mode"})`);
});

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    inactivity_deadline TIMESTAMP DEFAULT (DATETIME('now', '+90 days')),
    inactivity_period_days INTEGER DEFAULT 90
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS wills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    document TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS executors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    email TEXT UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS emails_sent (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    recipient TEXT NOT NULL,
    email_type TEXT NOT NULL,  
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    opened BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);
});

module.exports = db;