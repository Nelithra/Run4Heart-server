require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const app = express();


// Allow all origins (Netlify, localhost, etc.)
app.use(cors());

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