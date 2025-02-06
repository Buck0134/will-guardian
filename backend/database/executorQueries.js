const db = require("./db");

// Add an executor
const addExecutor = (userId, executorEmail, callback) => {
  db.run("INSERT INTO executors (user_id, email) VALUES (?, ?)", [userId, executorEmail], callback);
};

// Get executors for a user
const getExecutorsByUserId = (userId, callback) => {
  db.all("SELECT email FROM executors WHERE user_id = ?", [userId], callback);
};

module.exports = { addExecutor, getExecutorsByUserId };