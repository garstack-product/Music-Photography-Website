const express = require('express');
const { Event, Venue } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [{ model: Venue }]
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;