import { Request, Response } from 'express'
import { ResponseModel } from '../models/ResponseModel'
import { Message } from '../utils/Message'
import db from '../database';
import { setError } from '../utils/ErrorManager';

let r: ResponseModel = new ResponseModel();
let statusResponse: number;

class tareaAnuncioController {
    async getTareaAnuncio(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`SELECT A.tipo, A.titulo, A.descripcion, G.grado, C.nombre_Curso, A.punteo
            FROM t_Anuncio_Tarea A
            LEFT JOIN t_Grado G
            ON A.grado_Id = G.grado_Id
            LEFT JOIN t_Curso_Materia C
            ON A.curso_Id = C.curso_Id
            WHERE IFNULL(fecha_Vencimiento,CURDATE() + INTERVAL 1 DAY) >= CURDATE()
            AND A.dpi_Empleado = ?`, req.params.dpiProfesor);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Ningun Anuncio o Tarea Publicada.";
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

    async publicarTareaAnuncio(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`INSERT INTO t_Anuncio_Tarea SET ? `,[req.body]);
            if(queryResponse.length <= 0 || queryResponse.affectedRows != 1){
                r = Message._422_INTERNAL_ERROR;
                statusResponse = Message._422_INTERNAL_ERROR.code;
            } else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = 'Publicación Realizada Correctamente';
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    async getTareas(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`SELECT A.anuncio_Tarea_Id, A.titulo, A.descripcion, G.grado, G.grado_Id, C.nombre_Curso, A.punteo, A.calificado
            FROM t_Anuncio_Tarea A
            LEFT JOIN t_Grado G
            ON A.grado_Id = G.grado_Id
            LEFT JOIN t_Curso_Materia C
            ON A.curso_Id = C.curso_Id
            WHERE A.dpi_Empleado = ? AND A.tipo = 'TAREA'`, req.params.dpiProfesor);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Ninguna Tarea Publicada.";
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

    async getTareasPorGrado(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`SELECT A.anuncio_Tarea_Id ,A.titulo, A.descripcion, C.nombre_Curso, A.punteo, A.calificado, date_format(A.fecha_Entrega,"%d-%m-%Y") AS fecha_Entrega
                FROM t_Anuncio_Tarea A
                LEFT JOIN t_Curso_Materia C
                ON A.curso_Id = C.curso_Id
                WHERE A.tipo = 'TAREA'
                AND A.grado_Id = (SELECT grado_Id FROM t_Alumno WHERE cui_Alumno = ?)`, req.params.cuiAlumno);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Ninguna Tarea Encontrada.";
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

    async getAnunciosPorGrado(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`SELECT titulo, descripcion
                FROM t_Anuncio_Tarea
                WHERE tipo = 'ANUNCIO'
                AND fecha_Vencimiento >= CURDATE()
                AND grado_Id = (SELECT grado_Id FROM t_Alumno WHERE cui_Alumno = ?)`, req.params.cuiAlumno);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Ningún Anuncio Encontrado.";
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

    async calificarTarea(req: Request, res: Response){
        try{
            const tareaID = req.body.anuncio_Tarea_Id;
            const queryResponse = await db.query(`INSERT INTO t_Calificacion_Tarea SET ? `,[req.body]);
            if(queryResponse.length <= 0 || queryResponse.affectedRows != 1){
                r = Message._422_INTERNAL_ERROR;
                statusResponse = Message._422_INTERNAL_ERROR.code;
            } else {
                db.query(`UPDATE t_Anuncio_Tarea SET calificado = 'SI' WHERE anuncio_Tarea_Id = ${tareaID}`);
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = 'Tarea Calificada Correctamente';
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    async getPunteoTarea(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`SELECT C.punteo_Tarea, C.observacion, A.punteo
                FROM t_Calificacion_Tarea C
                INNER JOIN t_Anuncio_Tarea A
                ON C.anuncio_Tarea_Id = A.anuncio_Tarea_Id
                WHERE C.anuncio_Tarea_Id = ${req.params.tareaID}
                AND C.cui_Alumno = '${req.params.cuiAlumno}'`);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Tarea no Calificada.";
                statusResponse = Message._404_NOT_FOUND.code;
            }
            else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = queryResponse[0];
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

const TareaAnuncioController = new tareaAnuncioController();
export default TareaAnuncioController;

/***** ANUNCIO *****/
// {
//     "tipo": "ANUNCIO",
//     "titulo": "Traer mucho dinero",
//     "grado_Id": 1, --DEPENDE DE LOS GRADOS DEL PROFESOER
//     "descripcion": "El 1 de NOV. traer dinero extra",
//     "dpi_Empleado": "EMP-321",
//     "fecha_Vencimiento":"2022-10-31"
// }

/***** TAREA *****/

// {
//     "tipo": "TAREA",
//     "titulo": "El Cuerpo Humano",
//     "grado_Id": 1, --DEPENDE DE LOS GRADOS DEL PROFESOER
//     "descripcion": "Realizar una maqueta del cuerpo humano",
//     "curso_Id": 3, --DEPENDE DE LOS CURSOS DEL PROFESOER
//     "punteo": 15,
//     "dpi_Empleado": "EMP-321",
//     "calificado": "NO",
//     "fecha_Entrega":"2022-10-31",
//     "visibilidad_Publicacion": "SI"
// }