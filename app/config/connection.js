const mongoose = require('mongoose');
const config = require('./settings');

const url = (!config.mongodb.username || !config.mongodb.password) ? `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}` : `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`;
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true })
    .then(() => {
         console.log(`Mongo connected successfully ${url}`)
    })
    .catch(() => {
        console.log('monngo connection error');
        
    })
module.exports =mongoose;