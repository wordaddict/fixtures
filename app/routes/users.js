const express = require('express');
const userRoutes = express.Router();

// import user controller
const UserController = require('../controllers/users');

// Route to log user in
userRoutes.post('/login', (req, res) => {
    return new UserController().logUserIn(req, res);
});

// Route to sign user up
userRoutes.post('/signup', (req, res) => {
    return new UserController().signUpUser(req, res);
});

module.exports = userRoutes;