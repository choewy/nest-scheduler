'use strict';

const { Schema } = require('mongoose');
const { model } = require('mongoose');

const ChatSchema = Schema({
    message: {
        type: String,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

const Chat = model('Chat', ChatSchema);

module.exports = { Chat };