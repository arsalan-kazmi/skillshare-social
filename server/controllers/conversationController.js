const Conversation = require("../models/Conversation");

const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.user._id] },
    })
      .populate("members", "name avatar")
      .sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createConversation = async (req, res) => {
  try {
    const { userId } = req.body;

    let existing = await Conversation.findOne({
      members: { $all: [req.user._id, userId] },
    });

    if (existing) return res.json(existing);

    const conv = await Conversation.create({
      members: [req.user._id, userId],
    });

    res.json(conv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getConversations, createConversation };
