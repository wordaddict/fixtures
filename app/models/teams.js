const mongoose = require('mongoose');

const config = require('../config/settings');

const collection = config.mongodb.collections;

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  color: {
    type: String
  },
  league: {
    type: String,
    default: 'premier-league'
  },
  location: {
    type: String,
    default: 'England'
  },
  stadium: {
    type: String
  },
}, {
  timestamps: true,
}
);

const teamsModel = mongoose.model(collection.team, teamSchema);

module.exports = teamsModel;
