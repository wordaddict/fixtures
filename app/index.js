const express = require('express');
const mongoose = require('./config/connection');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())

// require all routes
const userRoutes = require('./routes/users');
const teamRoutes = require('./routes/teams');
const fixtureRoutes = require('./routes/fixture');

// add all routes
app.use(userRoutes);
app.use(teamRoutes);
app.use(fixtureRoutes);

const config = require('./config/settings');

app.get('/', (req, res) => {
    res.send(`Welcome to ${config.app_name}`)
});

app.listen(config.api_server.port, () => {
    console.log(`${config.app_name} is listening on port ${config.api_server.port}`)
});

module.exports = app;