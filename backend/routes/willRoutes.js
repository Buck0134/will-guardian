const express = require("express");
const { uploadWill, getWill } = require("../controllers/willController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/will", authenticate, uploadWill);
router.get("/will", authenticate, getWill);

module.exports = router;