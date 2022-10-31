import { Request, Response } from 'express'
import { ResponseModel } from '../models/ResponseModel'
import { Message } from '../utils/Message'
import db from '../database';
import { setError } from '../utils/ErrorManager';
// Para las imagenes / Fotos
import { uploadFile } from '../AWS_S3';
import fs from "fs";

let r: ResponseModel = new ResponseModel();
let statusResponse: number;

class infoExtraController {
    async getGrados(req: Request, res: Response){
        try{
            const queryResponse = await db.query('SELECT * FROM t_Grado');
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Grados No Encontrados";
                statusResponse = Message._404_NOT_FOUND.code;
            } else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = queryResponse;
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    async getGradosPROF(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`SELECT * 
            FROM t_Grado WHERE grado_Id IN (SELECT IPGC.grado_Id
                FROM t_Empleado E
                INNER JOIN t_Interseccion_Prof_Grado_Curso IPGC
                ON E.dpi_Empleado = IPGC.dpi_Empleado
                WHERE E.dpi_Empleado = ?)`, req.params.dpiProfesor);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Grados No Asignados";
                statusResponse = Message._404_NOT_FOUND.code;
            } else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = queryResponse;
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    async getGradosALUM(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`SELECT * 
                FROM t_Grado WHERE grado_Id IN (SELECT A.grado_Id
                    FROM t_Alumno A
                    WHERE A.cui_Alumno = ?)`, req.params.cuiAlumno);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Grado No Asignado";
                statusResponse = Message._404_NOT_FOUND.code;
            } else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = queryResponse;
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    async getCursosPorGradoPROF(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`SELECT CM.curso_Id, CM.nombre_Curso
                FROM t_Interseccion_Prof_Grado_Curso PC
                INNER JOIN t_Curso_Materia CM
                ON PC.curso_Id = CM.curso_Id
                WHERE PC.dpi_Empleado = '${req.params.dpiProfesor}' AND PC.grado_Id = ${req.params.grado_Id}`);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Cursos No Encontrados";
                statusResponse = Message._404_NOT_FOUND.code;
            } else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = queryResponse;
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    async getCursosPorIDGrado(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`SELECT C.curso_Id, C.nombre_Curso 
                FROM t_Interseccion_Curso_Grado ICG
                INNER JOIN t_Curso_Materia C
                ON ICG.curso_Id = C.curso_Id
                WHERE ICG.grado_Id = ${req.params.grado_Id} 
                AND ICG.asignado = 'NO'`);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Cursos No Encontrados";
                statusResponse = Message._404_NOT_FOUND.code;
            } else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = queryResponse;
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    async getMeses(req: Request, res: Response){
        try{
            const queryResponse = await db.query('SELECT * FROM t_Mes');
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Meses No Encontrados"
                statusResponse = Message._404_NOT_FOUND.code;
            } else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = queryResponse;
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    async getMesPorID(req: Request, res: Response){
        try{
            const queryResponse = await db.query('SELECT * FROM t_Mes WHERE mes_Id = ?', req.params.mes_Id);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Mes No Encontrado"
                statusResponse = Message._404_NOT_FOUND.code;
            } else if(queryResponse[1]){ //EJ. Cuando haya dos registron con mismo Id (No pasará por la primary key pero por si acaso XD)
                r = Message._422_INTERNAL_ERROR;
                statusResponse = Message._422_INTERNAL_ERROR.code;
            } else { 
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = queryResponse;
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    //POST IMAGEN HACIA S3
    async uploadPhotoToS3(req: Request, res: Response) {
        try {
            const file: any = req.file;
            let originalName = file.originalname;
            let fileDelete = file.filename;
            const resultUpload = await uploadFile(file, originalName);
            if(resultUpload.ETag && resultUpload.Location && resultUpload.Key && resultUpload.Bucket){
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = { Location: resultUpload.Location };
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            }
            else{
                r = Message._500_UNCONTROLLER_ERROR;
                statusResponse = Message._500_UNCONTROLLER_ERROR.code;
            }
            res.status(statusResponse).json(r.model);
            //Eliminar el archivo de la carpeta Uploads
            try {
                fs.unlinkSync(`uploads\\${fileDelete}`);
            } catch (err) {
                console.error("Something wrong happened removing the file", err);
            }
        } catch (err) {
            console.error("Error Upload Photo AWS S3",err);
            r = Message._500_UNCONTROLLER_ERROR;
            statusResponse = Message._500_UNCONTROLLER_ERROR.code;
            res.status(statusResponse).json(r.model);
        }
    }

    // Obtener meses pendientes de pago de los ALUMNOS
    async getMesesPendientesPagoAlumno(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`SELECT * FROM t_Mes
                WHERE mes_Id > (SELECT IFNULL(PC.mes_Id,0)
                    FROM t_Alumno A
                    LEFT JOIN t_Pago_Colegio PC
                    ON PC.pago_Id = A.detalle_Ultimo_Pago
                    WHERE A.cui_Alumno = ? )`, req.params.cuiAlumno);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Meses Pendientes de Pago Del Alumno No Encontrados"
                statusResponse = Message._404_NOT_FOUND.code;
            } else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = queryResponse;
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    // Obtener meses pendientes de pago de los EMPLEADOS
    async getMesesPendientesPagoEmpleado(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`SELECT * FROM t_Mes
                WHERE mes_Id > (SELECT IFNULL(PS.mes_Id,0)
                    FROM t_Empleado E 
                    LEFT JOIN t_Pago_Salarial PS 
                    ON PS.pago_Id = E.detalle_ultimo_Pago
                    WHERE E.dpi_Empleado = ? )`, req.params.dpiEmpleado);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Meses Pendientes de Pago Del Alumno No Encontrados"
                statusResponse = Message._404_NOT_FOUND.code;
            } else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = queryResponse;
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }
}

const InfoExtraController = new infoExtraController();
export default InfoExtraController;


/*

    -- JOIN CON GRADO PARA SABER EL NOMBRE DEL GRADO
SELECT G.grado, C.nombre_Curso 
FROM t_Interseccion_Curso_Grado ICG
INNER JOIN t_Curso_Materia C
ON ICG.curso_Id = C.curso_Id
INNER JOIN t_Grado G
ON ICG.grado_Id = G.grado_Id
WHERE ICG.grado_Id = 1 
AND ICG.asignado = 'NO';

-- JOIN SIN GRADO SOLO NOS INTERESAN LAS MATERIAS DEL GRADO
SELECT C.nombre_Curso 
FROM t_Interseccion_Curso_Grado ICG
INNER JOIN t_Curso_Materia C
ON ICG.curso_Id = C.curso_Id
WHERE ICG.grado_Id = 5 
AND ICG.asignado = 'NO';

*/


