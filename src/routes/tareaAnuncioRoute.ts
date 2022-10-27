import { Router } from 'express'
import TareaAnuncioController from '../controllers/tareaAnuncioController'

class tareaAnuncioRoute {
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void {        
        /*RUTA PADRE /api/anuncioTarea */
        this.router.get('/getTareaAnuncio/:dpiProfesor',TareaAnuncioController.getTareaAnuncio);
        this.router.post('/publicarTareaAnuncio',TareaAnuncioController.publicarTareaAnuncio);
    }
}
const TareaAnuncioRoute = new tareaAnuncioRoute();
export default TareaAnuncioRoute.router;