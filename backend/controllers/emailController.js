const { logEmailSent, markEmailAsOpened, getUnopenedEmails } = require("../database/emailQueries");

const nodemailer = require("nodemailer");
const { getInactiveUsers } = require("../database/userQueries");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send inactivity check emails
const sendAliveCheckEmails = () => {
  getInactiveUsers((err, users) => {
    if (err) {
      console.error("Error fetching inactive users:", err);
      return;
    }

    users.forEach((user) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Are you still alive?",
        text: `Please log in to confirm you're alive: http://localhost:3000/login`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Error sending email:", err);
        } else {
          console.log(`Alive check email sent to ${user.email}:`, info.response);
        }
      });
    });
  });
};

// Track Email Open
const trackEmailOpen = (req, res) => {
  const emailId = req.params.id;

  markEmailAsOpened(emailId, (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "Email open status recorded." });
  });
};

// Send a test email (for debugging)
const sendTestEmail = (req, res) => {
  logEmailSent(req.user.userId, req.body.recipient, "test", (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "Test email logged successfully" });
  });
};

// Get unopened emails for a user
const getUnopenedEmailsHandler = (req, res) => {
  getUnopenedEmails(req.user.userId, (err, emails) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(emails);
  });
};

module.exports = { trackEmailOpen, sendTestEmail, getUnopenedEmailsHandler, sendAliveCheckEmails};