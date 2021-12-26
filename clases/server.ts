import { SERVER_PORT } from './../global/environment';
import  express  from 'express';
import socketIO from 'socket.io'
import http from 'http';
import* as socketEvents from '../sockets/sockets';

export class Server{

    private static _instance: Server;

    public app:express.Application;
    public port:number;
    public io:socketIO.Server;
    private httpServer:http.Server;

    private constructor(){
        this.app =  express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);    //Cconfigurando el server de http con Express
        this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true } } );

        this.escucharSockets();
    }

    public start(callback:Function){
        // this.app.listen(this.port, callback());      //Iniciar el servidor de express
        this.httpServer.listen(this.port, callback());  //Iniciar el servidor http
    }

    private escucharSockets(){
        console.log("Escuchando conexiones");
        
        this.io.on('connection', cliente => {
            console.log("Nuevo cliente conectado");

            socketEvents.Desconectar(cliente);
            socketEvents.Mensaje(cliente, this.io);
        });
    }

    public static get instance(){
        //Regresa la instancia si no existe, caso contrario crea una nueva
        return this._instance || (this._instance = new Server())
    }
}