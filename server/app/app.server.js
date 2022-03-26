'use strict';

const http = require("http")
const socketIo = require("socket.io");
const { Chat } = require("../chat/chat.model");

module.exports = (app) => {
    const server = http.createServer(app);
    const io = socketIo(server);

    io.on("connection", socket => {
        socket.on("Input Chat Message", msg => {
            connect.then(db => {
                try {
                    let chat = new Chat({ message: msg.chatMessage, sender: msg.userID, type: msg.type })

                    chat.save((err, doc) => {
                        if (err) return res.json({ success: false, err })

                        Chat.find({ "_id": doc._id })
                            .populate("sender")
                            .exec((err, doc) => { return io.emit("Output Chat Message", doc); })
                    })
                } catch (error) {
                    console.error(error);
                }
            })
        })
    })

    return server;
};