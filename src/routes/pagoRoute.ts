import { Router } from 'express'
import PagoController from '../controllers/pagoController'

class pagoRoute {
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void {        
        /*RUTA PADRE /api/pago */
        this.router.post('/realizarPago',PagoController.realizarPagoVariosADMIN); // Pagos a realizar: INSCRIPCION, COLEGIATURA AMBOS NIVELES Y SALARIO
    }
}
const PagoRoute = new pagoRoute();
export default PagoRoute.router;