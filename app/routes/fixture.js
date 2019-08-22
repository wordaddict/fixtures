const express = require('express');

const admin_auth = require('../middleware/admin_auth');
const user_auth = require('../middleware/user_auth');
const fixtureRoutes = express.Router();

// import fixture controller
const FixtureController = require('../controllers/fixture');

// Route to get all fixtures
fixtureRoutes.get('/fixtures', admin_auth, (req, res) => {
    return new FixtureController().getAllFixtures(req, res);
});

// Route to add new fixture
fixtureRoutes.post('/fixtures', admin_auth, (req, res) => {
    return new FixtureController().addNewFixture(req, res);
});

// Route to update a fixture
fixtureRoutes.put('/fixtures', admin_auth, (req, res) => {
    return new FixtureController().updateFixture(req, res);
});

// Route to remove a fixture
fixtureRoutes.delete('/fixtures', admin_auth, (req, res) => {
    return new FixtureController().removeFixture(req, res);
});

// Route to search a fixture
fixtureRoutes.get('/search_fixtures', (req, res) => {
    return new FixtureController().searchForFixture(req, res);
});

// Route to generate unique link for fixture
fixtureRoutes.get('/fixtures_link', admin_auth, (req, res) => {
    return new FixtureController().generateUniqueLink(req, res);
});

// Route to view fixture status
fixtureRoutes.get('/status', user_auth, (req, res) => {
    return new FixtureController().viewFixtureStatus(req, res);
});

module.exports = fixtureRoutes;