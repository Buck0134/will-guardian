const express = require("express");
const { trackEmailOpen, sendTestEmail, getUnopenedEmailsHandler } = require("../controllers/emailController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/track-email/:id", trackEmailOpen);
router.post("/send-test-email", authenticate, sendTestEmail);
router.get("/unopened-emails", authenticate, getUnopenedEmailsHandler);

module.exports = router;