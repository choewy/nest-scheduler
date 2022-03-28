'use strict';

const { Schema } = require('mongoose');
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

// 비밀번호 변경 시 암호화
UserSchema.pre('save', async function (next) {
    const user = this;
    const { password } = user;

    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(Number(saltRounds));
        user.password = await bcrypt.hash(password, salt);
    };

    next();
});

// 비밀번호 비교
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// 토큰 생성 (payload에 ObjectId만 저장하였음)
UserSchema.methods.generateToken = async function () {
    const user = this;
    try {
        const { _id } = user;
        user.token = jwt.sign(_id.toHexString(), jwtSecret);
        await user.save();
        return user;
    } catch (error) {
        throw Error("Failed Gen Token");
    };
};

// 토큰에 저장된 ObjectId로 사용자 정보 조회
UserSchema.statics.findByToken = async function (token) {
    const user = this;
    try {
        const _id = jwt.verify(token, jwtSecret);
        return await user.findOne({ _id, token });
    } catch (error) {
        throw Error("Failed Auth");
    };
};

module.exports = { UserSchema };