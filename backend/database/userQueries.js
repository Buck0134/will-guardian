const db = require("./db");

// Create a new user
const createUser = (email, password, callback) => {
  db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, password], callback);
};

// Get user by email
const getUserByEmail = (email, callback) => {
  db.get("SELECT * FROM users WHERE email = ?", [email], callback);
};

// Update last login and extend inactivity deadline
const updateInactivityDeadline = (userId, inactivityPeriod, callback) => {
    db.run(
      "UPDATE users SET inactivity_deadline = DATETIME('now', ? || ' days') WHERE id = ?",
      [inactivityPeriod, userId],
      callback
    );
  };
  
  // Get users whose inactivity deadline has passed
  const getInactiveUsers = (callback) => {
    db.all("SELECT * FROM users WHERE inactivity_deadline <= DATETIME('now')", [], callback);
  };
  
  // Update inactivity period (user-configurable)
  const updateInactivityPeriod = (userId, inactivityPeriod, callback) => {
    db.run(
      "UPDATE users SET inactivity_period_days = ?, inactivity_deadline = DATETIME('now', ? || ' days') WHERE id = ?",
      [inactivityPeriod, inactivityPeriod, userId],
      callback
    );
  };
  
  module.exports = { createUser, updateInactivityDeadline, getInactiveUsers, updateInactivityPeriod, getUserByEmail };