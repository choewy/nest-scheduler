'use strict';

const server = require('./app/app');
const port = process.env.PORT

server.listen(port, () => {
    console.log(`Server Running at ${port}`)
});