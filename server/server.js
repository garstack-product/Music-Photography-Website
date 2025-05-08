require('dotenv').config(); // CommonJS way to load dotenv
const express = require('express');
const eventsRouter = require('./routes/events');
const { initDB } = require('./services/database');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/events', eventsRouter);

// Initialize and start server
initDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    require('./services/scheduler'); // CommonJS require instead of dynamic import
  });
});