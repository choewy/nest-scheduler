'use strict';

const { Chat } = require("./chat.model");

class ChatController {
    // JOIN 쿼리
    #populateQuery = [{
        path: 'sender',
        select: 'email name'
    }];

    // Date 객체를 YYYY-MM-DD hh:mm으로 변경
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

    // 생성자
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
    };

    // 모든 채팅 내역 전송
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

    // 채팅 저장 및 최근 채팅 내역 전송
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
