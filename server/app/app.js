'use strict';

require('dotenv/config');

const express = require("express");
const app = express();

require('./app.mongo')();
require("./app.middles")(app);
require('./app.routes')(app);
const server = require('./app.server')(app);

module.exports = server;