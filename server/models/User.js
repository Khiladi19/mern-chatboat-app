import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  role: { type: String, enum: ['admin', 'student'], default: 'student' },
});

export default mongoose.model('User', userSchema);
