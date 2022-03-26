const express = require('express');
const cookieParser = require("cookie-parser");

module.exports = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());
    app.use('/uploads', express.static('uploads'));
};