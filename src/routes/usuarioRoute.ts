import { Router } from 'express'
import UserController from '../controllers/usuarioController'

class userRoute {
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void {        
        /*RUTA PADRE /api/usuario */
        this.router.get('/getUsuarios',UserController.getUsuarios);
    }
}
const UserRoute = new userRoute();
export default UserRoute.router;

// DEPENDENCIA NO INSTALADA
// jsonwebtoken
// TUTORIAL -> https://www.youtube.com/watch?v=vTtcuIZIvAA MIN 14


// SOLO SAX
// https://www.youtube.com/watch?v=13E5sgzp1Pg
