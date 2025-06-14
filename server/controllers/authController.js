import { clerkClient } from '@clerk/clerk-sdk-node';
import User from '../models/User.js';

export const syncUser = async (req, res) => {
  try {
    const { clerkId, name, email } = req.body;
    // console.log("Received data:", req.body);
    
    // Check if user already exists
    let existingUser = await User.findOne({ clerkId });

    if (existingUser) {
      console.log("Existing user found:", existingUser.role);
      return res.status(200).json({ role: existingUser.role });
    }

    // Fetch Clerk user details (optional, for validation)
    const clerkUser = await clerkClient.users.getUser(clerkId);

    // Create new user with default role
    const newUser = new User({
      clerkId: clerkUser.id,
      name: name || clerkUser.firstName,
      email: email || clerkUser.emailAddresses[0].emailAddress,
      role: 'student', // Default role
    });

    await newUser.save();
    console.log("New user created:", newUser.role);

    return res.status(201).json({ role: newUser.role });
  } catch (error) {
    console.error('User sync failed:', error.message);
    return res.status(500).json({ error: 'User sync failed' });
  }
};
