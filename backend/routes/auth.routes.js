import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import authMiddleware from '../middlewares/auth.js';

const authRouter = express.Router();

// REGISTER (User Signup)
authRouter.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// LOGIN (Authenticate User)
authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token, user: { id: user._id, username: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Protected route to get user profile
authRouter.get('/profile', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password'); // Exclude password
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });


  // Update user bio not used you can implement its frontend in settings page
  authRouter.put("/update", authMiddleware, async (req, res) => {
    try {
        const { bio } = req.body;

        // Find user by ID
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user bio
        user.bio = bio;
        await user.save();

        res.status(200).json({ message: "Bio updated successfully", bio: user.bio });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


export default authRouter;
