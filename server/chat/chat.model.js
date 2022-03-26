const { model } = require('mongoose');
const ChatSchema = require('./chat.schema');
const Chat = model('Chat', ChatSchema);

module.exports = { Chat };