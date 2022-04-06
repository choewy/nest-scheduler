'use strict';

const { Schema } = require('mongoose');
const { model } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = process.env.SALT_ROUNDS;
const jwtSecret = process.env.JWT_SECRET;

const UserSchema = Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minglength: 5
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
});

UserSchema.pre('save', async function (next) {
    const user = this;
    const { password } = user;

    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(Number(saltRounds));
        user.password = await bcrypt.hash(password, salt);
    };

    next();
});

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = async function () {
    const user = this;
    try {
        const { _id } = user;
        user.token = jwt.sign(_id.toHexString(), jwtSecret);
        user.tokenExp = 60 * 60;
        await user.save();
        return user;
    } catch (error) {
        throw Error("Failed Gen Token");
    };
};

UserSchema.statics.findByToken = async function (token) {
    const user = this;
    try {
        const _id = jwt.verify(token, jwtSecret);
        return await user.findOne({ _id, token });
    } catch (error) {
        throw Error("Failed Auth");
    };
};

const User = model('User', UserSchema);

module.exports = { User };