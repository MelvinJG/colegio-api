import { Router } from 'express'
import AlumnoEncargadoController from '../controllers/alumnoEncargadoController'

class alumnoEncargadoRoute {
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void {        
        /*RUTA PADRE /api/alumnoEncargado */
        /*Operaciones Encargado*/
        this.router.post('/addEncargado',AlumnoEncargadoController.addEncargado);
        this.router.get('/getEncargadoDPI/:dpiEncargado',AlumnoEncargadoController.getEncargadoPorDPI);
        this.router.put('/updateEncargado/:dpiEncargado',AlumnoEncargadoController.updateEncargado);
        /*Operaciones Alumno*/
        this.router.post('/addAlumno',AlumnoEncargadoController.addAlumno); //inscribir 
        // this.router.get('/getAlumnoCUI/:cuiAlumno',AlumnoEncargadoController.getAlumnoPorCUI);CREAR EN DADO CASO SE QUIERE ACTUALIZAR AL ALUMNO
        this.router.get('/getDetalleUltimoPagoAlumno/:cuiAlumno',AlumnoEncargadoController.getDetalleUltimoPagoAlumno);
        this.router.get('/getAlumnosPorGrado/:idGrado',AlumnoEncargadoController.getAlumnosPorGrado);
        this.router.put('/updateAlumno/:cuiAlumno',AlumnoEncargadoController.updateAlumno);
        this.router.delete('/deleteAlumno/:cuiAlumno',AlumnoEncargadoController.deleteAlumno);
        /*Operación para ambos*/
        // Inicialmente se pensaba eliminar al encargado cuando se elimina un alumno
        // Sin embargo un encargado puede tener varios hijos en el colegio, entonces no se puede
    }
}
const AlumnoEncargadoRoute = new alumnoEncargadoRoute();
export default AlumnoEncargadoRoute.router;