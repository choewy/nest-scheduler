const { model } = require('mongoose');
const { UserSchema } = require('./user.schema');

const User = model('User', UserSchema);

module.exports = { User };