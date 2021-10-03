const Server = require('./models/server');
require('dotenv').config();


console.clear();

const server = new Server();

server.listen();