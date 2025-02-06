const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail, updateLastLogin } = require("../database/userQueries");

const SECRET_KEY = process.env.SECRET_KEY || "supersecretkey";

// Register user
const register = (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
  
    createUser(email, hashedPassword, (err) => {
      if (err) return res.status(400).json({ message: "User already exists" });
  
      getUserByEmail(email, (err, user) => {
        if (err || !user) return res.status(500).json({ message: "Error fetching user data" });
  
        // Generate JWT Token
        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "7d" });
  
        res.json({ token, message: "User registered successfully" });
      });
    });
  };

// Login user
const login = (req, res) => {
  const { email, password } = req.body;

  getUserByEmail(email, (err, user) => {
    if (err || !user) return res.status(401).json({ message: "Invalid credentials" });

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "7d" });

    updateLastLogin(user.id, (err) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json({ token, message: "Logged in successfully" });
    });
  });
};

module.exports = { register, login };