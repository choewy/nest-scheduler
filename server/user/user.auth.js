'use strict';

const { User } = require("./user.model");
const cookieTokenKey = process.env.COOKIE_TOKEN_KEY || 'app_token';

// 인증 미들웨어
const auth = async (req, res, next) => {
    try {
        const token = req.cookies[cookieTokenKey];
        const user = await User.findByToken(token);
        req.token = token;
        req.user = user;
    } catch (error) {
        const { message } = error;
        return res.json({ auth: false, message });
    };

    next();
};

module.exports = { auth };