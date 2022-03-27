'use strict';

const http = require("http");
const { join } = require("path");
const socketIo = require("socket.io");
const { Chat } = require("../chat/chat.model");

module.exports = (app) => {
    const server = http.createServer(app);
    const io = socketIo(server, {
        cors: { origin: '*', credentials: true }
    });

    const dateTimeFormatter = (createdAt) => {
        const dt = new Date(createdAt);
        return [
            dt.getFullYear(), "-",
            `0${dt.getMonth() + 1}`.slice(-2) + "-",
            `0${dt.getDate()}`.slice(-2), " ",
            `0${dt.getHours()}`.slice(-2), ":",
            `0${dt.getMinutes()}`.slice(-2)
        ].join('');
    };

    const populateQuery = [{
        path: 'sender',
        select: 'email name'
    }];

    io.on('connection', (socket) => {
        socket.on('load', async () => {
            let rows = await Chat.find({}).populate(populateQuery);
            const chats = rows.map(row => {
                const { _doc } = row;
                return {
                    ..._doc,
                    createdAt: dateTimeFormatter(_doc.createdAt)
                };
            });
            io.emit('load', chats);
        });

        socket.on('push', async (data) => {
            try {
                let chat = new Chat(data);
                const { _id } = await chat.save();
                const { _doc } = await Chat.findOne({ _id }).populate(populateQuery);
                chat = {
                    ..._doc,
                    createdAt: dateTimeFormatter(_doc.createdAt)
                };
                return io.emit('push', chat);
            } catch (error) {
                console.log(error);
            }
        });
    });


    console.log('chat')
    // io.on("connection", socket => {
    //     socket.on("send_chat", async (data) => {

    //         const { message, sender, type } = data;
    //         const chat = new Chat({ message, sender, type });
    //         try {
    //             const { _id } = await chat.save();
    //             const doc = await Chat.find({ _id }).populate('sender');
    //             return io.emit('get_chats', doc);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     });
    // });

    return server;
};