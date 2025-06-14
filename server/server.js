import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors({
  // origin: "http://localhost:5173", 
  origin: "https://mern-chatboat-frontend.onrender.com", 
  credentials: true,
}));
// Routes
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));

