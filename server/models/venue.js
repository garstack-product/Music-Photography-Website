const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Venue = sequelize.define('Venue', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: DataTypes.INTEGER,
    address: DataTypes.TEXT,
    latitude: DataTypes.DECIMAL(10, 8),
    longitude: DataTypes.DECIMAL(11, 8),
    website: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'venues'
  });

  Venue.associate = (models) => {
    Venue.hasMany(models.Event, {
      foreignKey: 'venue_id',
      as: 'events'
    });
  };

  return Venue;
};