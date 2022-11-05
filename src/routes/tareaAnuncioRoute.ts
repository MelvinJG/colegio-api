import { Router } from 'express'
import TareaAnuncioController from '../controllers/tareaAnuncioController'

class tareaAnuncioRoute {
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void {        
        /*RUTA PADRE /api/anuncioTarea */
        this.router.get('/getTareaAnuncio/:dpiProfesor',TareaAnuncioController.getTareaAnuncio); //Para Prof
        this.router.get('/getTareas/:dpiProfesor',TareaAnuncioController.getTareas); //Para Prof
        this.router.post('/publicarTareaAnuncio',TareaAnuncioController.publicarTareaAnuncio);
        this.router.post('/calificarTarea',TareaAnuncioController.calificarTarea);
        // Alumnos
        this.router.get('/getTareasPorGrado/:cuiAlumno',TareaAnuncioController.getTareasPorGrado);
        this.router.get('/getAnunciosPorGrado/:cuiAlumno',TareaAnuncioController.getAnunciosPorGrado);
        this.router.get('/getPunteoTarea/:tareaID/:cuiAlumno',TareaAnuncioController.getPunteoTarea);
    }
}
const TareaAnuncioRoute = new tareaAnuncioRoute();
export default TareaAnuncioRoute.router;