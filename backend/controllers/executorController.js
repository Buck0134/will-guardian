const { addExecutor, getExecutorsByUserId } = require("../database/executorQueries");

// Add Executor
const addExecutorHandler = (req, res) => {
  const { executor_email } = req.body;

  addExecutor(req.user.userId, executor_email, (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "Executor added successfully" });
  });
};

// Get Executors
const getExecutorsHandler = (req, res) => {
  getExecutorsByUserId(req.user.userId, (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(rows);
  });
};

module.exports = { addExecutorHandler, getExecutorsHandler };