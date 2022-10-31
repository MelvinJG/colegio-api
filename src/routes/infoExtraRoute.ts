import { Router } from 'express'
import multer from 'multer'
import InfoExtraController from '../controllers/infoExtraController'

class infoExtraRoute {
    public router: Router = Router();
    constructor(){
        this.config();
    }

    upload = multer({dest : 'uploads/'});

    config():void {        
        /*RUTA PADRE /api/infoExtra */
        this.router.get('/getGrados',InfoExtraController.getGrados);
        this.router.get('/getGradosPROF/:dpiProfesor',InfoExtraController.getGradosPROF);
        this.router.get('/getGradosALUM/:cuiAlumno',InfoExtraController.getGradosALUM);
        this.router.get('/getCursosPorGradoPROF/:dpiProfesor/:grado_Id',InfoExtraController.getCursosPorGradoPROF);
        this.router.get('/getCursosPorGrado/:grado_Id',InfoExtraController.getCursosPorIDGrado);
        this.router.get('/getMeses',InfoExtraController.getMeses);
        this.router.get('/getMesPorID/:mes_Id',InfoExtraController.getMesPorID);
        this.router.post('/foto/uploadPhotoToS3',this.upload.single('image'),InfoExtraController.uploadPhotoToS3);
        // Obtener meses pendientes de pago de los ALUMNOS
        this.router.get('/getMesesPendientesPagoAlumno/:cuiAlumno',InfoExtraController.getMesesPendientesPagoAlumno);
        // Obtener meses pendientes de pago de los EMPLEADOS
        this.router.get('/getMesesPendientesPagoEmpleado/:dpiEmpleado',InfoExtraController.getMesesPendientesPagoEmpleado);
    }
}
const InfoExtraRoute = new infoExtraRoute();
export default InfoExtraRoute.router;
