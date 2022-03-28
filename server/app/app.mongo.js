'use strict';

const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;
const mongoDBName = process.env.MONGO_DB_NAME;

// MongoDB 연결
module.exports = async () => {
    await mongoose.connect(mongoURI, {
        dbName: mongoDBName
    });
};