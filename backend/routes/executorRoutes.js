const express = require("express");
const { addExecutorHandler, getExecutorsHandler } = require("../controllers/executorController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/executor", authenticate, addExecutorHandler);
router.get("/executors", authenticate, getExecutorsHandler);

module.exports = router;