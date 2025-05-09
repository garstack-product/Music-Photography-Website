const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Event = sequelize.define('Event', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    artist_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ticket_url: DataTypes.STRING,
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    start_time: DataTypes.TIME,
    end_date: DataTypes.DATE,
    end_time: DataTypes.TIME,
    status: {
      type: DataTypes.ENUM('onsale', 'soldout', 'cancelled', 'postponed'),
      defaultValue: 'onsale'
    },
    span_multiple_days: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    promoter_id: DataTypes.STRING,
    promoter_name: DataTypes.STRING,
    classification: DataTypes.STRING,
    genre: DataTypes.STRING,
    sub_genre: DataTypes.STRING,
    artist_image_url: DataTypes.STRING,
    twitter_url: DataTypes.STRING,
    youtube_url: DataTypes.STRING,
    spotify_url: DataTypes.STRING,
    instagram_url: DataTypes.STRING,
    facebook_url: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'events'
  });

  Event.associate = (models) => {
    Event.belongsTo(models.Venue, {
      foreignKey: 'venue_id',
      as: 'venue'
    });
  };

  return Event;
};