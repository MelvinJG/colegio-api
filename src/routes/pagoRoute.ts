import { Router } from 'express'
import PagoController from '../controllers/pagoController'

class pagoRoute {
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void {        
        /*RUTA PADRE /api/pago */
        this.router.post('/realizarPago',PagoController.realizarPagoVariosADMIN); // Pagos a realizar: INSCRIPCION, COLEGIATURA AMBOS NIVELES Y SALARI
        this.router.post('/realizarPagoApp',PagoController.realizarPagoApp);
        this.router.get('/getAllPagosApp',PagoController.getAllPagosApp);
        this.router.get('/getPagosAppAlumno/:cuiAlumno',PagoController.getPagosAppAlumno);
        this.router.get('/countAllPagosApp',PagoController.countAllPagosApp);
        this.router.put('/cancelarEnvio/:comprobanteID',PagoController.cancelarEnvio);
        this.router.put('/rechazarComprobante/:comprobanteID',PagoController.rechazarComprobante);
    }
}
const PagoRoute = new pagoRoute();
export default PagoRoute.router;
