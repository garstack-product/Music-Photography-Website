const path = require('path');
const dotenv = require('dotenv');

// Print current working directory
console.log('Current directory:', __dirname);

// Load .env from two levels up
const envPath = path.resolve(__dirname, '../../.env');
console.log('Looking for .env at:', envPath);

// Load config
dotenv.config({ path: envPath });

// Debug output
console.log('All environment variables:', process.env);
console.log('Database URL:', process.env.DATABASE_URL);