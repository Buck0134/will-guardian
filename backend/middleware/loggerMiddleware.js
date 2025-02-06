const fs = require("fs");
const path = require("path");

// Log file path
const logFilePath = path.join(__dirname, "../logs/api.log");

// Ensure the logs directory exists
if (!fs.existsSync(path.dirname(logFilePath))) {
  fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

// Middleware function to log API activity
const apiLogger = (req, res, next) => {
  const startTime = Date.now();

  // Capture request details immediately
  const logEntry = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    headers: req.headers,
    status: null,
    responseTime: null,
    response: null
  };

  // Capture response when it finishes
  res.on("finish", () => {
    logEntry.status = res.statusCode;
    logEntry.responseTime = `${Date.now() - startTime}ms`;

    // Log response body for debugging purposes
    if (res.locals.responseData) {
      logEntry.response = res.locals.responseData;
    }

    // Write log entry to file
    fs.appendFileSync(logFilePath, JSON.stringify(logEntry) + "\n");

    // Print to console for real-time monitoring
    console.log(`[${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} -> ${logEntry.status} (${logEntry.responseTime})`);
  });

  next();
};

// Middleware to log responses (useful for capturing errors)
const logResponse = (req, res, next) => {
  const originalJson = res.json;
  res.json = function (body) {
    res.locals.responseData = body; // Store response for logging
    originalJson.call(this, body);
  };
  next();
};

module.exports = { apiLogger, logResponse };