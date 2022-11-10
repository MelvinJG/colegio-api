import { Router } from 'express'
import ReporteController from '../controllers/reporteController'

class reporteRoute {
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void {        
        /*RUTA PADRE /api/reporteADMIN */
        this.router.get('/getIngresoEgreso',ReporteController.getIngresoEgreso);
        this.router.get('/getSolventeInsolvente',ReporteController.getSolventeInsolvente);
        this.router.get('/getOrigenPago',ReporteController.getOrigenPago);
        this.router.get('/getCantidadAlumnoEmpleado',ReporteController.getCantidadAlumnoEmpleado);
    }

}
const ReporteRoute = new reporteRoute();
export default ReporteRoute.router;

//Nota en los ingresos y egresos falta la tabla de ventas de productos