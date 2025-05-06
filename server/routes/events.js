import express from 'express';
import { pool } from '../services/database.js';

const router = express.Router();

// GET /api/events - with filtering
router.get('/', async (req, res) => {
  try {
    const { type, country, source, upcoming } = req.query;
    
    let query = 'SELECT * FROM events WHERE 1=1';
    const params = [];
    
    if (type) {
      query += ` AND type = $${params.length + 1}`;
      params.push(type);
    }
    
    if (country) {
      query += ` AND country = $${params.length + 1}`;
      params.push(country);
    }
    
    if (source) {
      query += ` AND source = $${params.length + 1}`;
      params.push(source);
    }

    if (upcoming === 'true') {
      query += ` AND date >= NOW()`;
    }
    
    query += ' ORDER BY date ASC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;