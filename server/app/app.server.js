'use strict';

const http = require("http");
const socketIo = require("socket.io");
const { ChatController } = require("../chat/chat.controller");

module.exports = (app) => {
    const server = http.createServer(app);
    const io = socketIo(server, {
        cors: { origin: '*', credentials: true }
    });

    io.on('connection', (socket) => {
        const chatController = new ChatController(io, socket);
        socket.on('load', chatController.onLoad);
        socket.on('push', chatController.onPush);
    });

    return server;
};