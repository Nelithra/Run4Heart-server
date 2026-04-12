const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  score:     { type: Number, required: true },
  character: { type: String, default: '🏃' },
  country:   { type: String, default: '' },
  flag:      { type: String, default: '' },
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date:      { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', scoreSchema);