const express = require('express');
const { Event, Venue } = require('../models');
const router = express.Router();

// Get all concerts in Ireland/Northern Ireland
router.get('/concerts/ireland', async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [{
        model: Venue,
        where: {
          country: ['Ireland', 'Northern Ireland']
        }
      }],
      where: {
        classification: { [Op.ne]: 'Festival' }
      }
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get festivals in target countries
router.get('/festivals/europe', async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [{
        model: Venue,
        where: {
          country: [
            'Ireland', 'Northern Ireland', 'United Kingdom',
            'France', 'Netherlands', 'Germany', 'Spain'
          ]
        }
      }],
      where: {
        classification: 'Festival'
      }
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Make sure this is the LAST line in the file:
export default router;