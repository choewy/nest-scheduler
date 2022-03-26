'use strict';

const User = require("./user.model");

const auth = async (req, res, next) => {
    let token = req.cookies.w_auth;

    const user = await User.findByToken(token);

    if (!user) return res.json({ auth: false });

    req.token = token;
    req.user = user;

    next();
};

module.exports = { auth };