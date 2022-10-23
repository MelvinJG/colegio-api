import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import infoExtraRoute from './routes/infoExtraRoute';
import alumnoEncargadoRoute from './routes/alumnoEncargadoRoute';
import productoRoute from './routes/productoRoute';
import empleadoRoute from './routes/empleadoRoute';
import pagoRoute from './routes/pagoRoute';
import userRoute from './routes/usuarioRoute';

import * as dotenv from "dotenv";
dotenv.config();

class Server{
    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.route();
    }    
    config(): void{
        this.app.set('port', process.env.PORT || 2200);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }
    route(): void{
        this.app.use('/api/infoExtra',infoExtraRoute);
        this.app.use('/api/alumnoEncargado',alumnoEncargadoRoute);
        this.app.use('/api/producto',productoRoute);
        this.app.use('/api/empleado',empleadoRoute);
        this.app.use('/api/pago',pagoRoute);
        this.app.use('/api/usuarioAuth',userRoute);
    }
    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('Escuchando en el puerto ',this.app.get('port'));
        });
    }
}

const Servidor = new Server();
Servidor.start();
