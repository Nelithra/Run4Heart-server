require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const app = express();

// Fix CORS to allow live-server
app.use(cors({
  origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'file://'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/leaderboard', require('./routes/leaderboard'));

// Connect to MongoDB then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!');
    app.listen(process.env.PORT, () => {
      console.log('Server running on http://localhost:' + process.env.PORT);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));