const express = require('express');
const teamRoutes = express.Router();

const admin_auth = require('../middleware/admin_auth');

// import team controller
const TeamController = require('../controllers/teams');

// Route to get all teams
teamRoutes.get('/teams', admin_auth, (req, res) => {
    return new TeamController().getAllTeams(req, res);
});

// Route to add new team
teamRoutes.post('/teams', admin_auth, (req, res) => {
    return new TeamController().addNewTeam(req, res);
});

// Route to update a team
teamRoutes.put('/teams', admin_auth, (req, res) => {
    return new TeamController().updateTeam(req, res);
});

// Route to remove a team
teamRoutes.delete('/teams', admin_auth, (req, res) => {
    return new TeamController().removeTeam(req, res);
});

// Route to search a team
teamRoutes.get('/search_teams', (req, res) => {
    return new TeamController().searchForTeam(req, res);
});

module.exports = teamRoutes;