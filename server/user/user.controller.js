'use strict';

const { User } = require('./user.model');

class UserController {
    static auth = (req, res) => {
        res.status(200).json({
            _id: req.user._id,
            isAdmin: req.user.role === 0 ? false : true,
            isAuth: true,
            email: req.user.email,
            name: req.user.name,
            lastname: req.user.lastname,
            role: req.user.role,
            image: req.user.image,
        });
    };

    static signUp = (req, res) => {
        const user = new User(req.body);
        user.save((err, doc) => {
            if (err) return res.json({ success: false, err });
            sendEmail(doc.email, doc.name, null, "welcome");
            return res.status(200).json({
                success: true
            });
        });
    };

    static signIn = (req, res) => {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (!user)
                return res.json({
                    loginSuccess: false,
                    message: "Auth failed, email not found"
                });

            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch)
                    return res.json({ loginSuccess: false, message: "Wrong password" });

                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);
                    res.cookie("w_authExp", user.tokenExp);
                    res
                        .cookie("w_auth", user.token)
                        .status(200)
                        .json({
                            loginSuccess: true
                        });
                });
            });
        });
    };

    static signOut = (req, res) => {
        User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            });
        });
    };
};

module.exports = { UserController };