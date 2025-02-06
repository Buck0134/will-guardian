const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "supersecretkey";

// Middleware to authenticate users
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });

  console.log("Recieved Request : ", req)
};

module.exports = { authenticate };