const { sequelize } = require('../models');

async function initDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

module.exports = { initDB };