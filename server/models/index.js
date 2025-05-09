const { Sequelize } = require('sequelize');
const path = require('path');

// Load .env from project root
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Verify environment variable is loaded
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env file');
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: console.log, // Enable SQL logging for debugging
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { require: true } : false
  }
});

// Test connection immediately
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful!');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit if connection fails
  }
})();

const models = {
  Event: require('./event')(sequelize),
  Venue: require('./venue')(sequelize)
};

Object.values(models).forEach(model => {
  if (model.associate) model.associate(models);
});

module.exports = {
  sequelize,
  ...models,
  Op: Sequelize.Op
};