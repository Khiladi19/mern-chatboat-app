import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    console.log("body",req.body)

    const newMessage = new Message({ senderId, receiverId, message });
    await newMessage.save();

    res.status(200).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Message sending failed' });
  }
};

export const getChatBetweenUsers = async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 }
      ]
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Fetching chat failed' });
  }
};

