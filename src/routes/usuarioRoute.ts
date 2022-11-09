import { Router } from 'express'
import { Request, Response, NextFunction } from 'express'
import { ResponseModel } from '../models/ResponseModel'
import UserController from '../controllers/usuarioController'
import { Message } from '../utils/Message'
import { setError } from '../utils/ErrorManager';
//JSON WEB TOKEN
const jwt = require('jsonwebtoken');

import * as dotenv from "dotenv";
dotenv.config();

let r: ResponseModel = new ResponseModel();
let statusResponse: number;

class userRoute {
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void {        
        /*RUTA PADRE /api/usuarioAuth */
        this.router.get('/getUsuarios',UserController.getUsuarios);
        this.router.post('/singin',UserController.singin);
        this.router.put('/adminPerfil/:idUsuario/:tipoCambio',UserController.adminPerfil);
        this.router.post('/test/:id',this.verifyToken,UserController.test);
    }

    verifyToken(req: Request, res: Response, next: NextFunction){
        try{
            if(!req.headers.authorization){
                r = Message._401_UNAUTHORIZED;
                statusResponse = Message._401_UNAUTHORIZED.code;
                return res.status(statusResponse).json(r.model);
            }
            const token = req.headers.authorization?.substring(7);
            if(token !== ''){
                const verify = jwt.verify(token, process.env.TOKEN_SECRET);
                req.accepted = verify;
                next();
            } else {
                r = Message._401_UNAUTHORIZED;
                statusResponse = Message._401_UNAUTHORIZED.code;
                return res.status(statusResponse).json(r.model);
            }
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }
}
const UserRoute = new userRoute();
export default UserRoute.router;

// DEPENDENCIA NO INSTALADA
// jsonwebtoken
// TUTORIAL -> https://www.youtube.com/watch?v=vTtcuIZIvAA MIN 30


// SOLO SAX
// https://www.youtube.com/watch?v=13E5sgzp1Pg
