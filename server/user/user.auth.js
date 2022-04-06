'use strict';

const { User } = require("./user.model");
const cookieTokenKey = process.env.COOKIE_TOKEN_KEY || 'app_token';

const auth = async (req, res, next) => {
    try {
        const token = req.cookies[cookieTokenKey];
        const user = await User.findByToken(token);
        if (!user) return res.json({ auth: false });
        req.token = token;
        req.user = user;
    } catch {
        return res.json({ auth: false });
    };

    next();
};

module.exports = { auth };