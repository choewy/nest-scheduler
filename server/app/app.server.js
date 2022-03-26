'use strict';

const http = require("http")
const socketIo = require("socket.io");
const { Chat } = require("../chat/chat.model");

module.exports = (app) => {
    const server = http.createServer(app);
    const io = socketIo(server);

    io.on("connection", socket => {
        socket.on("send_chat", async (data) => {
            const { message, sender, type } = data;
            const chat = new Chat({ message, sender, type });
            try {
                const { _id } = await chat.save();
                const doc = await Chat.find({ _id }).populate('sender');
                return io.emit('emit_chat', doc);
            } catch (error) {
                console.error(error);
            }
        });
    });

    return server;
};