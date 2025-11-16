const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware.js");

const conversationController = require("../controllers/conversationController");

router.get("/", auth, conversationController.getConversations);
router.post("/", auth, conversationController.createConversation);

module.exports = router;
