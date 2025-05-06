import 'dotenv/config'; // ES Module way to load dotenv
import express from 'express';
import eventsRouter from './routes/events.js';
import { initDB } from './services/database.js';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/events', eventsRouter);

// Initialize and start server
initDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    import('./services/scheduler.js'); // Dynamic import for side effects
  });
});