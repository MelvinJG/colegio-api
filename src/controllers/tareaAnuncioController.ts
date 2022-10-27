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
            WHERE A.dpi_Empleado = ?`, req.params.dpiProfesor);
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