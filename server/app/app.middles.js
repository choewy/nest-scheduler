'use strict';

const express = require('express');
const cookieParser = require("cookie-parser");

// 서버 미들웨어
module.exports = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());
    app.use('/uploads', express.static('uploads'));
};