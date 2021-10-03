const express = require('express');
const cors = require('cors');
const { controlSocket } = require('../socket/control-socket');
const { conectarMongodb } = require('../db/config');


class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.pathRoutes = {
            usuario:'/usuario',
            envios:'/envios'
        }
        this.conectarDB();
        this.middlewares();
        // this.sockets();
        this.routes();

    }

    async conectarDB(){
        await conectarMongodb();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.pathRoutes.usuario, require('../routes/usuario'));
    }

    sockets(){
        this.io.on('connection', socket => controlSocket( socket, this.io));
    }

    listen(){
        this.app.listen( this.port ,()=>{
            console.log(`Escuchando en el puerto:${this.port}`)
        });
    }
}



module.exports=Server;