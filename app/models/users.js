const mongoose = require('mongoose');

const config = require('../config/settings');

const collection = config.mongodb.collections;

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  phone_no: {
    type: String
  },
  privilegde: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true,
}
);

const UsersModel = mongoose.model(collection.users, usersSchema);

module.exports = UsersModel;
