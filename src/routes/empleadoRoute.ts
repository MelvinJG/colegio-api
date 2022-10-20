import { Router } from 'express'
import EmpleadoController from '../controllers/empleadoController'

class empleadoRoute {
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void {        
        /*RUTA PADRE /api/empleado */
        this.router.post('/addEmpleado',EmpleadoController.addEmpleado);
        this.router.get('/getEmpleados',EmpleadoController.getEmpleados);
        this.router.get('/getEmpleadoDPI/:dpiEmpleado',EmpleadoController.getEmpleadoPorDPI);
        this.router.delete('/deleteEmpleado/:dpiEmpleado',EmpleadoController.deleteEmpleado);
        this.router.get('/getDetalleUltimoPagoEmpleado/:dpiEmpleado',EmpleadoController.getDetalleUltimoPagoEmpleado);
    }
}
const EmpleadoRoute = new empleadoRoute();
export default EmpleadoRoute.router;