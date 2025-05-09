// db-connection-test.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: console.log
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');
    
    // Test raw query
    const [result] = await sequelize.query('SELECT NOW() AS current_time');
    console.log('🕒 Database time:', result[0].current_time);
  } catch (error) {
    console.error('❌ Connection failed:', error);
  } finally {
    await sequelize.close();
  }
})();