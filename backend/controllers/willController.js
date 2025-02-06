const { saveWill, getWillByUserId } = require("../database/willQueries");

// Upload Will
const uploadWill = (req, res) => {
  const { document } = req.body;
  saveWill(req.user.userId, document, (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "Will saved successfully" });
  });
};

// Get Will
const getWill = (req, res) => {
  getWillByUserId(req.user.userId, (err, row) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (!row) return res.status(404).json({ message: "No will found" });
    res.json({ document: row.document });
  });
};

module.exports = { uploadWill, getWill };