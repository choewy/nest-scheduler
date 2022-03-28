'use strict';

const http = require("http");
const socketIo = require("socket.io");
const { ChatController } = require("../chat/chat.controller");

// socket 통신
module.exports = (app) => {
    const server = http.createServer(app);

    // socket Origin 전체 허용
    const io = socketIo(server, {
        cors: { origin: '*', credentials: true }
    });

    // socket 연결
    io.on('connection', (socket) => {
        // 채팅 컨트롤러
        const chatController = new ChatController(io, socket);

        // 모든 채팅 내역
        socket.on('load', chatController.onLoad);

        // 채팅 저장 및 최근 채팅 내역
        socket.on('push', chatController.onPush);
    });

    return server;
};