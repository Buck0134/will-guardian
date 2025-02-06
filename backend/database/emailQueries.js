const db = require("./db");

// Log an email sent
const logEmailSent = (userId, recipient, emailType, callback) => {
  db.run(
    "INSERT INTO emails_sent (user_id, recipient, email_type) VALUES (?, ?, ?)",
    [userId, recipient, emailType],
    callback
  );
};

// Mark an email as opened
const markEmailAsOpened = (emailId, callback) => {
  db.run("UPDATE emails_sent SET opened = 1 WHERE id = ?", [emailId], callback);
};

// Get unopened emails for a user
const getUnopenedEmails = (userId, callback) => {
  db.all("SELECT * FROM emails_sent WHERE user_id = ? AND opened = 0", [userId], callback);
};

module.exports = { logEmailSent, markEmailAsOpened, getUnopenedEmails };