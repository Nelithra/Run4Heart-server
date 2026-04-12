const express = require('express');
const jwt     = require('jsonwebtoken');
const Score   = require('../models/Score');
const User    = require('../models/User');
const router  = express.Router();

// Middleware to verify token
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Get top 20 leaderboard
router.get('/', async (req, res) => {
  try {
    const scores = await Score.find()
      .sort({ score: -1 })
      .limit(20);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit a score (requires login)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, score, character, country, flag } = req.body;

    await Score.create({ name, score, character, country, flag, userId: req.user.id });

    // Update user's highScore if beaten
    await User.findByIdAndUpdate(req.user.id, 
      [{ $set: { highScore: { $max: ['$highScore', score] }, gamesPlayed: { $add: ['$gamesPlayed', 1] } } }]
    );

    res.json({ message: 'Score saved!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;