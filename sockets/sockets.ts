import { Socket } from "socket.io";
import socketIO from 'socket.io'

export const Desconectar = (cliente:Socket) => {
    cliente.on('disconnect', () => {
        console.log("Cliente desconectado");  
    });
}

// Escuchar mensjaes
export const Mensaje = (cliente:Socket, io:socketIO.Server) => {
    cliente.on('mensaje', (payload:{de:string, cuerpo:string}) => {
        console.log('Mensaje recibido en node ', payload);

        io.emit('mensaje-nuevo', payload);
    });
}

