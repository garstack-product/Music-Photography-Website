import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432
});

export async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id VARCHAR(50) PRIMARY KEY,
      source VARCHAR(20),
      type VARCHAR(20),
      country VARCHAR(10),
      title TEXT,
      description TEXT,
      venue TEXT,
      city TEXT,
      date TIMESTAMP,
      image_url TEXT,
      event_url TEXT,
      raw_data JSONB,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);
}

// Store events in database
export async function storeEvents(events, source, type, country) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    for (const event of events) {
      await client.query(`
        INSERT INTO events (
          id, source, type, country, 
          title, description, venue, city, 
          date, image_url, event_url, raw_data
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          venue = EXCLUDED.venue,
          city = EXCLUDED.city,
          date = EXCLUDED.date,
          image_url = EXCLUDED.image_url,
          event_url = EXCLUDED.event_url,
          raw_data = EXCLUDED.raw_data,
          updated_at = NOW()
      `, [
        event.id,
        source,
        type,
        country,
        event.title,
        event.description,
        event.venue,
        event.city,
        event.date, // This is now properly formatted or null
        event.image_url,
        event.event_url,
        event
      ]);
    }
    
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Database error:', error);
    throw error;
  } finally {
    client.release();
  }
}

export { pool };