const express  = require('express');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const User     = require('../models/User');
const router   = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { firstName, username, email, password, age, country, flag, avatar } = req.body;

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Username already taken' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName, username, email, age, country, flag,
      avatar: avatar || '🏃',
      password: hashed
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: { id: user._id, username, avatar: user.avatar, country, flag, highScore: 0 } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: { id: user._id, username: user.username, avatar: user.avatar, country: user.country, flag: user.flag, highScore: user.highScore } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;