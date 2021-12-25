import bodyParser from "body-parser";
import cors from 'cors';
import { Server } from "./clases/server";
import { router } from "./routes/router";

const server = new Server();

// Antes de las routres configurar body parse
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

// Configuramos las rutas
server.app.use('/', router);

// Configuracion del cors
server.app.use(cors({origin: true, credentials:true}));

server.start(() => {
    console.log("Servidor corriendo en puerto: " + server.port);
});
