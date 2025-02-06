const { updateInactivityDeadline, updateInactivityPeriod } = require("../database/userQueries");

// User logs in → Refresh inactivity deadline
const markAlive = (req, res) => {
  updateInactivityDeadline(req.user.userId, req.user.inactivityPeriod, (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "Status updated, inactivity deadline extended." });
  });
};

// User updates inactivity period
const updateUserInactivityPeriod = (req, res) => {
  const { inactivity_period_days } = req.body;

  if (inactivity_period_days < 30 || inactivity_period_days > 365) {
    return res.status(400).json({ message: "Inactivity period must be between 30 and 365 days." });
  }

  updateInactivityPeriod(req.user.userId, inactivity_period_days, (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "Inactivity period updated successfully." });
  });
};

module.exports = { markAlive, updateUserInactivityPeriod };