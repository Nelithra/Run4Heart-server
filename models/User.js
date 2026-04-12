const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName:   { type: String, required: true },
  username:    { type: String, required: true, unique: true },
  email:       { type: String, required: true, unique: true },
  password:    { type: String, required: true },
  age:         { type: Number },
  country:     { type: String, default: '' },
  flag:        { type: String, default: '' },
  avatar:      { type: String, default: '🏃' },
  highScore:   { type: Number, default: 0 },
  totalCoins:  { type: Number, default: 0 },
  gamesPlayed: { type: Number, default: 0 },
  created:     { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);