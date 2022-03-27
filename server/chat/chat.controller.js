'use strict';

const { Chat } = require("./chat.model");

class ChatController {
    #populateQuery = [{
        path: 'sender',
        select: 'email name'
    }];
    
    #dateTimeFormatter = (createdAt) => {
        const dt = new Date(createdAt);
        return [
            dt.getFullYear(), "-",
            `0${dt.getMonth() + 1}`.slice(-2) + "-",
            `0${dt.getDate()}`.slice(-2), " ",
            `0${dt.getHours()}`.slice(-2), ":",
            `0${dt.getMinutes()}`.slice(-2)
        ].join('');
    };

    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
    };

    onLoad = async () => {
        let rows = await Chat.find({}).populate(this.#populateQuery);
        const chats = rows.map(row => {
            const { _doc } = row;
            return {
                ..._doc,
                createdAt: this.#dateTimeFormatter(_doc.createdAt)
            };
        });
        this.io.emit('load', chats);
    };

    onPush = async (data) => {
        try {
            let chat = new Chat(data);
            const { _id } = await chat.save();
            const { _doc } = await Chat.findOne({ _id }).populate(this.#populateQuery);
            chat = {
                ..._doc,
                createdAt: this.#dateTimeFormatter(_doc.createdAt)
            };
            return this.io.emit('push', chat);
        } catch (error) {
            console.log(error);
        };
    };
};

module.exports = { ChatController };
