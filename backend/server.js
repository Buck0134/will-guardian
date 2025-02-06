require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const willRoutes = require("./routes/willRoutes");
const executorRoutes = require("./routes/executorRoutes");
const emailRoutes = require("./routes/emailRoutes");

const { apiLogger, logResponse } = require("./middleware/loggerMiddleware");


const app = express();
app.use(cors());
app.use(express.json());

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api", willRoutes);
app.use("/api", executorRoutes);
app.use("/api", emailRoutes);

app.use(apiLogger);
app.use(logResponse);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Will Guardian API running on http://localhost:${PORT}`);
});


// cron job
const cron = require("node-cron");
const { sendAliveCheckEmails } = require("./controllers/emailController");

// Run every day at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Checking for inactive users...");
  sendAliveCheckEmails();
});

module.exports = app;