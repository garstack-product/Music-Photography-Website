const { sequelize } = require('./models');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection successful!');
    
    // Test raw query
    const [results] = await sequelize.query('SELECT music_events()');
    console.log('Current database:', results[0].current_database);
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await sequelize.close();
    process.exit();
  }
})();