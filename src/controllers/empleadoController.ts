import { Request, Response } from 'express'
import { ResponseModel } from '../models/ResponseModel'
import { Message } from '../utils/Message'
import db from '../database';
import { setError } from '../utils/ErrorManager';

let r: ResponseModel = new ResponseModel();
let statusResponse: number;

class empleadoController {
    async addEmpleado(req: Request, res: Response){
        const DPI_Empleado = req.body.dpi_Empleado;
        try{
            if (DPI_Empleado === ''){
                r = Message._422_INTERNAL_ERROR;
                r.model!.data = 'DPI INCORRECTO';
                statusResponse = Message._422_INTERNAL_ERROR.code;
            } else{
                const esProfesor = req.body.grados;
                delete req.body.grados;
                const queryResponse = await db.query(`INSERT INTO t_Empleado SET ? `,[req.body]);
                if(queryResponse.length <= 0 || queryResponse.affectedRows != 1){
                    r = Message._422_INTERNAL_ERROR;
                    statusResponse = Message._422_INTERNAL_ERROR.code;
                } else {
                    if(esProfesor !== null){  //Es profesor
                        await db.query(`INSERT INTO t_Usuario(userName, pass, id_usuario, roleId) VALUES('${DPI_Empleado}','${DPI_Empleado}','${DPI_Empleado}','prof')`);
                        for(const index in esProfesor){
                            const finalResultInsertINTER = Object.assign({dpi_Empleado: DPI_Empleado},esProfesor[index]);
                            //Insertamos en la tabla t_Interseccion_Prof_Grado_Curso cada curso con su respectivo grado
                            const queryResponseInterseccion = await db.query(`INSERT INTO t_Interseccion_Prof_Grado_Curso SET ? `,[finalResultInsertINTER]);
                            if(queryResponseInterseccion.length <= 0 || queryResponseInterseccion.affectedRows != 1){
                                r = Message._422_INTERNAL_ERROR;
                                statusResponse = Message._422_INTERNAL_ERROR.code;
                            } else {
                                // 200 - OK
                                // Actualizar estado ASIGNADO = 'SI' tabla t_Interseccion_Curso_Grado
                                await db.query(`UPDATE t_Interseccion_Curso_Grado SET asignado = 'SI' WHERE grado_Id = ${esProfesor[index].grado_Id} AND curso_Id = ${esProfesor[index].curso_Id}`);
                            }
                        }
                    } // ELSE -> No es profesor No necesita la tabla interseccion con grados y materias
                    r = Message._200_OPERATION_SUCCESSFUL;
                    r.model!.data = 'Empleado Agregado Correctamente';
                    statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
                }
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            // await db.query(`DELETE FROM t_Empleado WHERE dpi_Empleado = '${DPI_Empleado}'`);
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    async getEmpleados(req: Request, res: Response){
        try{
            const queryResponse = await db.query('SELECT dpi_Empleado, nombre, foto, puesto, correo, salario, no_Cel, date_format(fecha_nac,"%d-%m-%Y") AS fecha_Nac FROM t_Empleado');
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Empleados No Encontrados"
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

    async getEmpleadoPorDPI(req: Request, res: Response){
        try{
            /**
             * --JOIN EMPLEADOS CON GRADOS Y CURSOS
                SELECT * FROM t_Empleado E
                INNER JOIN t_Interseccion_Prof_Grado_Curso INTER
                ON E.dpi_Empleado = INTER.dpi_Empleado
                INNER JOIN t_Grado G
                ON INTER.grado_Id = G.grado_Id
                INNER JOIN t_Curso_Materia C
                ON INTER.curso_Id = C.curso_Id
                WHERE E.dpi_Empleado = 'EMP-1';
             */
            const queryResponse = await db.query('SELECT * FROM t_Empleado WHERE dpi_Empleado = ?', req.params.dpiEmpleado);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Empleado No Encontrado"
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

    async deleteEmpleado(req: Request, res: Response){
        try{
            /* 
                VALIDAR QUE EL EMPLEADO EXISTA IGUAL EN EL UPDATE
                ESTO SE SOLUCIONA EN EL FONTEND PERO POR SI ACASO XD
            */
            // Obtenemos los grados y cursos al que estaba asignado el empleado
            const gradosYCursos = await db.query('SELECT grado_Id, curso_Id FROM t_Interseccion_Prof_Grado_Curso WHERE dpi_Empleado = ?', req.params.dpiEmpleado);
            // Eliminamos relacion de la tabla t_Interseccion_Prof_Grado_Curso
            await db.query('DELETE FROM t_Interseccion_Prof_Grado_Curso WHERE dpi_Empleado = ?', req.params.dpiEmpleado);
            // Eliminamos directtamente al empleado
            const queryDelete = await db.query('DELETE FROM t_Empleado WHERE dpi_Empleado = ?', req.params.dpiEmpleado);
            if(queryDelete.affectedRows === 1){
                // 200 - OK
                for(const index in gradosYCursos){
                    // Actualizar estado ASIGNADO = 'NO' tabla t_Interseccion_Curso_Grado
                    await db.query(`UPDATE t_Interseccion_Curso_Grado SET asignado = 'NO' WHERE grado_Id = ${gradosYCursos[index].grado_Id} AND curso_Id = ${gradosYCursos[index].curso_Id}`);
                }
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = 'Empleado Eliminado Correctamente';
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            } 
            else {
                r = Message._422_INTERNAL_ERROR;
                statusResponse = Message._422_INTERNAL_ERROR.code;
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    async getDetalleUltimoPagoEmpleado(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`SELECT E.dpi_Empleado, E.nombre, E.foto, E.puesto, date_format(PS.fecha_Pago,"%d-%m-%Y") AS fecha_Pago, TP.tipo_Pago, M.mes, PS.monto
                FROM t_Empleado E 
                LEFT JOIN t_Pago_Salarial PS 
                ON PS.pago_Id = E.detalle_ultimo_Pago
                LEFT JOIN t_Tipo_Pago TP 
                ON PS.tipo_pago_Id = TP.tipo_pago_Id
                LEFT JOIN t_Mes M
                ON PS.mes_Id = M.mes_Id
                WHERE E.dpi_Empleado = ? `, req.params.dpiEmpleado);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Empleado No Encontrado"
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

    async getProfesoresPorGrado(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`SELECT E.nombre, E.foto, E.no_Cel, E.correo, date_format(E.fecha_Nac,"%d-%m-%Y") AS fecha_Nac, C.nombre_Curso
            FROM t_Empleado E
            INNER JOIN t_Interseccion_Prof_Grado_Curso IPGC
            ON E.dpi_Empleado = IPGC.dpi_Empleado
            INNER JOIN t_Curso_Materia C
            ON IPGC.curso_Id = C.curso_Id
            WHERE IPGC.grado_Id = ?`, req.params.idGrado);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Profesor (es) no asignados."
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

const EmpleadoController = new empleadoController();
export default EmpleadoController;
