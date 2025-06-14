import express from 'express';
import {
  sendMessage,
  getChatBetweenUsers
} from '../controllers/chatController.js';

const router = express.Router();

router.post('/send', sendMessage);
router.get('/messages/:user1/:user2', getChatBetweenUsers);

export default router;
