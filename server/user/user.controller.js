'use strict';

const { User } = require('./user.model');

class UserController {
    static auth = (req, res) => {
        res.status(200).json({
            _id: req.user._id,
            auth: true,
            email: req.user.email,
            name: req.user.name,
            role: req.user.role,
            image: req.user.image,
        });
    };

    static signUp = async (req, res) => {
        const user = new User(req.body);
        try {
            await user.save();
            // await sendEmail(user.email, user.name, null, 'welcome');
            return res.json({ ok: true });
        } catch (error) {
            return res.json({ ok: false, error });
        }
    };

    static signIn = async (req, res) => {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) return res.json({
            ok: false, message: '이메일을 찾을 수 없습니다.'
        });

        const valid = await user.comparePassword(password);
        if (!valid) return res.json({
            ok: false, message: '비밀번호가 일치하지 않습니다.'
        });

        try {
            user = await user.generateToken();
            res.cookie('chat_app_auth_token_exp', user.tokenExp);
            res.cookie('chat_app_auth_token', user.token);
            return res.status(200).json({ ok: true });
        } catch (error) {
            return res.json({ ok: false, error });
        };
    };

    static signOut = async (req, res) => {
        try {
            const { _id } = req.user;
            await User.findOneAndUpdate({ _id }, { token: "", tokenExp: "" });
            return res.status(200).json({ ok: true });
        } catch (error) {
            return res.json({ ok: false, error });
        };
    };
};

module.exports = { UserController };