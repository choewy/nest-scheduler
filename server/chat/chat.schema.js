'use strict';

const { Schema } = require('mongoose');

const ChatSchema = Schema({
    message: {
        type: String,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String
    },
}, { timestamps: true });

module.exports = ChatSchema;