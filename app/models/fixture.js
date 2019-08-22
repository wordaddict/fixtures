const mongoose = require('mongoose');

const config = require('../config/settings');

const collection = config.mongodb.collections;

const fixturesSchema = new mongoose.Schema({
  home_team: {
    type: String,
    required: true,
  },
  away_team: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true
  },
  fixture_id: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'completed']
  },
  stadium: {
    type: String,
    default: 'Old Trafford'
  },
  time: {
    type: String,
    default: '20:00'
  },
}, {
  timestamps: true,
}
);

const FixtureModel = mongoose.model(collection.fixtures, fixturesSchema);

module.exports = FixtureModel;
