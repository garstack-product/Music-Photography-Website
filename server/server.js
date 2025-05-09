require('dotenv').config();
require('./services/scheduler.js')();

const express = require('express');
const cors = require('cors');
const eventsRouter = require('./routes/events');
const { initDB } = require('./services/database');

const app = express();
const port = process.env.PORT || 5000;

const initScheduler = require('./services/scheduler');


app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

app.use(express.json());
app.use('/api/events', eventsRouter);

initDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    require('./services/scheduler');
  });
});






// Initialize scheduler
initScheduler();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});