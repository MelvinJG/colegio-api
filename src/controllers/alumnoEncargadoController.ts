import { Request, Response } from 'express'
import { ResponseModel } from '../models/ResponseModel'
import { Message } from '../utils/Message'
import db from '../database';
import { setError } from '../utils/ErrorManager';

let r: ResponseModel = new ResponseModel();
let statusResponse: number;

class alumnoEncargadoController {
    /*Operaciones Encargado*/
    async addEncargado(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`INSERT INTO t_Encargado SET ? `,[req.body]);
            if(queryResponse.length <= 0 || queryResponse.affectedRows != 1){
                r = Message._422_INTERNAL_ERROR;
                statusResponse = Message._422_INTERNAL_ERROR.code;
            } else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = 'Encargado Agregado Correctamente';
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    async getEncargadoPorDPI(req: Request, res: Response){
        try{
            const queryResponse = await db.query('SELECT dpi_Encargado, nombre, correo, no_Cel, no_Tel_Casa, direccion FROM t_Encargado WHERE dpi_Encargado = ?', req.params.dpiEncargado);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Encargado No Encontrado"
                statusResponse = Message._404_NOT_FOUND.code;
            } else if(queryResponse[1]){ //EJ. Cuando haya dos registron con mismo Id (No pasará por la primary key pero por si acaso XD)
                r = Message._422_INTERNAL_ERROR;
                statusResponse = Message._422_INTERNAL_ERROR.code;
            } else { 
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

    async updateEncargado(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`UPDATE t_Encargado SET ? , fecha_Actualizacion = now() WHERE dpi_Encargado = ?`,[req.body,req.params.dpiEncargado]);
            if(queryResponse.length <= 0 || queryResponse.affectedRows != 1){
                r = Message._422_INTERNAL_ERROR;
                statusResponse = Message._422_INTERNAL_ERROR.code;
            } else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = 'Encargado Actualizado Correctamente';
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    /*Operaciones Alumno*/
    async addAlumno(req: Request, res: Response){
        try{
            const grado_ID = req.body.grado_Id;
            const cuiAlumno = req.body.cui_Alumno;
            const queryResponse = await db.query(`INSERT INTO t_Alumno SET ? `,[req.body]);
            if(queryResponse.length <= 0 || queryResponse.affectedRows != 1){
                r = Message._422_INTERNAL_ERROR;
                statusResponse = Message._422_INTERNAL_ERROR.code; //Validar Envio de Mensaje "No se puede agregar al alumnos"
            } else {
                const cantidadActualAlumnos = await db.query(`SELECT cantidad_Alumnos FROM t_Grado WHERE grado_Id = ${grado_ID}`);
                if(cantidadActualAlumnos.length <= 0 || cantidadActualAlumnos[1]){
                    //Grado no encontrado || EJ. Cuando haya dos registron con mismo Id (No pasará por la primary key pero por si acaso XD)
                    r = Message._422_INTERNAL_ERROR;
                    statusResponse = Message._422_INTERNAL_ERROR.code; //Validar Envio de Mensaje "No se puede agregar al alumnos"
                    await db.query(`DELETE FROM t_Alumno WHERE cui_Alumno = ${cuiAlumno}`);
                } else {
                    // 200 - OK
                    const queryUpdate = await db.query(`UPDATE t_Grado SET cantidad_Alumnos = (${cantidadActualAlumnos[0].cantidad_Alumnos} + 1) WHERE grado_Id = ${grado_ID}`);
                    if(queryUpdate.length <= 0 || queryUpdate.affectedRows != 1){
                        r = Message._422_INTERNAL_ERROR;
                        statusResponse = Message._422_INTERNAL_ERROR.code; //Validar Envio de Mensaje "No se puede agregar al alumnos"
                        await db.query(`DELETE FROM t_Alumno WHERE cui_Alumno = ${cuiAlumno}`);
                    } else {
                        // 200 - OK
                        r = Message._200_OPERATION_SUCCESSFUL;
                        r.model!.data = 'Alumno Agregado Correctamente';
                        statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
                    }
                }
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    /**DETALLE ULTIMO PAGO */
    async getDetalleUltimoPagoAlumno(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`SELECT A.cui_Alumno ,A.pago_Inscripcion, A.foto, A.nombre, date_format(PG.fecha_Pago,"%d-%m-%Y") AS fecha_Pago, TP.tipo_Pago, OP.origen_Pago, M.mes, PG.monto
                FROM t_Alumno A
                LEFT JOIN t_Pago_Colegio PG
                ON A.cui_Alumno = PG.cui_Alumno
                LEFT JOIN t_Tipo_Pago TP
                ON PG.tipo_pago_Id = TP.tipo_pago_Id
                LEFT JOIN t_Origen_Pago OP
                ON PG.origen_pago_Id = OP.origen_pago_Id
                LEFT JOIN t_Mes M
                ON PG.mes_Id = M.mes_Id
                WHERE A.cui_Alumno = ? 
                ORDER BY PG.pago_Id DESC 
                LIMIT 1`, req.params.cuiAlumno);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Alumno No Encontrado"
                statusResponse = Message._404_NOT_FOUND.code;
            } else if(queryResponse[1]){ //EJ. Cuando haya dos registron con mismo Id (No pasará por la primary key pero por si acaso XD)
                r = Message._422_INTERNAL_ERROR;
                statusResponse = Message._422_INTERNAL_ERROR.code;
            } else { 
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

    // async getAlumnoPorCUI(req: Request, res: Response){} PENDIENTE IGUAL AL DETALLE ULTIMO PAGO SOLO CAMIBA QUERY

    async getAlumnosPorGrado(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`SELECT A.nombre AS nombre_Alumno, A.foto, A.cui_Alumno, A.relacion_Encargado, E.nombre AS nombre_Encargado, E.no_Cel, date_format(A.fecha_Nac,"%d-%m-%Y") AS fecha_Nac
                FROM t_Alumno A
                INNER JOIN t_Encargado E
                ON A.dpi_Encargado = E.dpi_Encargado
                WHERE A.grado_Id = ?`, req.params.idGrado);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Alumnos No Encontrados"
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

    async updateAlumno(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`UPDATE t_Alumno SET ? , fecha_Actualizacion = now() WHERE cui_Alumno = ?`,[req.body,req.params.cuiAlumno]);
            if(queryResponse.length <= 0 || queryResponse.affectedRows != 1){
                r = Message._422_INTERNAL_ERROR;
                statusResponse = Message._422_INTERNAL_ERROR.code;
            } else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = 'Alumno Actualizado Correctamente';
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    async deleteAlumno(req: Request, res: Response){
        try{
            /* 
                VALIDAR QUE EL ALUMNO EXISTA IGUAL EN EL UPDATE
                ESTO SE SOLUCIONA EN EL FONTEND PERO POR SI ACASO XD
                EJEMPLO ESTA EN EL productoController methodo DELETE
            */
            //Obtener el grado del alumno a eliminar para restarle uno a la cantidad de su grado
            const gradoAlumno = await db.query(`SELECT grado_Id FROM t_Alumno WHERE cui_Alumno = ?`, req.params.cuiAlumno);
            if(gradoAlumno.length <= 0 || gradoAlumno[1]){
                r = Message._422_INTERNAL_ERROR;
                statusResponse = Message._422_INTERNAL_ERROR.code;
                // Validar Mensaje
            } else { 
                // 200 - OK
                const queryDelete = await db.query('DELETE FROM t_Alumno WHERE cui_Alumno = ?', req.params.cuiAlumno);
                if(queryDelete.affectedRows === 1){
                    // 200 - OK
                    const cantidadActualAlumnos = await db.query(`SELECT cantidad_Alumnos FROM t_Grado WHERE grado_Id = ${gradoAlumno[0].grado_Id}`);
                    await db.query(`UPDATE t_Grado SET cantidad_Alumnos = (${cantidadActualAlumnos[0].cantidad_Alumnos} - 1) WHERE grado_Id = ${gradoAlumno[0].grado_Id}`);
                    r = Message._200_OPERATION_SUCCESSFUL;
                    r.model!.data = 'Alumno Eliminado Correctamente';
                    statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
                } 
                else {
                    r = Message._422_INTERNAL_ERROR;
                    statusResponse = Message._422_INTERNAL_ERROR.code;
                }
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }
}

const AlumnoEncargadoController = new alumnoEncargadoController();
export default AlumnoEncargadoController;
