const db = require("./db");

// Save user’s will
const saveWill = (userId, document, callback) => {
  db.run("INSERT INTO wills (user_id, document) VALUES (?, ?)", [userId, document], callback);
};

// Get user’s will
const getWillByUserId = (userId, callback) => {
  db.get("SELECT document FROM wills WHERE user_id = ?", [userId], callback);
};

module.exports = { saveWill, getWillByUserId };