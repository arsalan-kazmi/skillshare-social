const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;

    const msg = await Message.create({
      conversationId,
      sender: req.user._id,
      text,
    });

    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: {
        text,
        sender: req.user._id,
        createdAt: new Date(),
      },
    });

    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const msgs = await Message.find({
      conversationId: req.params.id,
    }).sort({ createdAt: 1 });

    res.json(msgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { sendMessage, getMessages };
