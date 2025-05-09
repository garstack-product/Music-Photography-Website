require('dotenv').config();
console.log('DB URL:', process.env.DATABASE_URL);
console.log('All variables:', Object.keys(process.env));