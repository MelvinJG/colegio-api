import { Request, Response } from 'express'
import { ResponseModel } from '../models/ResponseModel'
import { Message } from '../utils/Message'
import db from '../database';
import { setError } from '../utils/ErrorManager';

let r: ResponseModel = new ResponseModel();
let statusResponse: number;

class reporteController {
    async getIngresoEgreso(req: Request, res: Response){
        try{
            // Primer Bloque: Ingresos Tabla Alumnos [0-11]
            // Segundo Bloque: Egresos Tabla Empleados [11-23]
            const queryResponse = await db.query(`SELECT IFNULL(SUM(monto),0) AS sumaMes
                FROM t_Pago_Colegio
                WHERE fecha_Pago BETWEEN '2022-01-01' AND '2022-01-31'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Colegio
                WHERE fecha_Pago BETWEEN '2022-02-01' AND '2022-02-28'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Colegio
                WHERE fecha_Pago BETWEEN '2022-03-01' AND '2022-03-31'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Colegio
                WHERE fecha_Pago BETWEEN '2022-04-01' AND '2022-04-30'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Colegio
                WHERE fecha_Pago BETWEEN '2022-05-01' AND '2022-05-31'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Colegio
                WHERE fecha_Pago BETWEEN '2022-06-01' AND '2022-06-30'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Colegio
                WHERE fecha_Pago BETWEEN '2022-07-01' AND '2022-07-31'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Colegio
                WHERE fecha_Pago BETWEEN '2022-08-01' AND '2022-08-31'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Colegio
                WHERE fecha_Pago BETWEEN '2022-09-01' AND '2022-09-30'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Colegio
                WHERE fecha_Pago BETWEEN '2022-10-01' AND '2022-10-31'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Colegio
                WHERE fecha_Pago BETWEEN '2022-11-01' AND '2022-11-30'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Colegio
                WHERE fecha_Pago BETWEEN '2022-12-01' AND '2022-12-31'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Salarial
                WHERE fecha_Pago BETWEEN '2022-01-01' AND '2022-01-31'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Salarial
                WHERE fecha_Pago BETWEEN '2022-02-01' AND '2022-02-28'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Salarial
                WHERE fecha_Pago BETWEEN '2022-03-01' AND '2022-03-31'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Salarial
                WHERE fecha_Pago BETWEEN '2022-04-01' AND '2022-04-30'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Salarial
                WHERE fecha_Pago BETWEEN '2022-05-01' AND '2022-05-31'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Salarial
                WHERE fecha_Pago BETWEEN '2022-06-01' AND '2022-06-30'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Salarial
                WHERE fecha_Pago BETWEEN '2022-07-01' AND '2022-07-31'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Salarial
                WHERE fecha_Pago BETWEEN '2022-08-01' AND '2022-08-31'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Salarial
                WHERE fecha_Pago BETWEEN '2022-09-01' AND '2022-09-30'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Salarial
                WHERE fecha_Pago BETWEEN '2022-10-01' AND '2022-10-31'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Salarial
                WHERE fecha_Pago BETWEEN '2022-11-01' AND '2022-11-30'
                UNION ALL
                SELECT IFNULL(SUM(monto),0)
                FROM t_Pago_Salarial
                WHERE fecha_Pago BETWEEN '2022-12-01' AND '2022-12-31'`);
            // if(queryResponse.length <= 0){
            //     r = Message._404_NOT_FOUND;
            //     r.model!.message = "Ninguna Solicitud de Pago Encontrada.";
            //     statusResponse = Message._404_NOT_FOUND.code;
            // } else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = queryResponse;
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            // }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    async getSolventeInsolvente(req: Request, res: Response){
        try{
            // Primer Bloque: PAGOS AL MES ACTUAL [0] SOLVENTES
            // Segundo Bloque: PAGOS EN OTRO MES [1] INSOLVENTES
            const queryResponse = await db.query(`SELECT COUNT(1) AS coutSolventes
                FROM t_Alumno A
                LEFT JOIN t_Pago_Colegio PC
                ON A.detalle_Ultimo_Pago = PC.pago_Id
                WHERE IFNULL(PC.mes_Id,0) = MONTH(CURRENT_DATE())
                UNION ALL
                SELECT COUNT(1)
                FROM t_Alumno A
                LEFT JOIN t_Pago_Colegio PC
                ON A.detalle_Ultimo_Pago = PC.pago_Id
                WHERE IFNULL(PC.mes_Id,0) <> MONTH(CURRENT_DATE())`);
            // if(queryResponse.length <= 0){
            //     r = Message._404_NOT_FOUND;
            //     r.model!.message = "Ninguna Solicitud de Pago Encontrada.";
            //     statusResponse = Message._404_NOT_FOUND.code;
            // } else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = queryResponse;
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            // }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    async getOrigenPago(req: Request, res: Response){
        try{
            // Primer Bloque: PAGOS EN ADMIN [0]
            // Segundo Bloque: PAGOS EN APP [1]
            const queryResponse = await db.query(`SELECT COUNT(1) AS pagoOrigen
                FROM t_Pago_Colegio 
                WHERE origen_pago_Id = 1
                UNION ALL
                SELECT COUNT(1)
                FROM t_Pago_Colegio 
                WHERE origen_pago_Id = 2`);
            // if(queryResponse.length <= 0){
            //     r = Message._404_NOT_FOUND;
            //     r.model!.message = "Ninguna Solicitud de Pago Encontrada.";
            //     statusResponse = Message._404_NOT_FOUND.code;
            // } else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = queryResponse;
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            // }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    async getCantidadAlumnoEmpleado(req: Request, res: Response){
        try{
            // Validar cuando alumno y empleado esten eliminados
            // Primer Bloque: CANTIDAD DE ALUMNOS [0]
            // Segundo Bloque: CANTIDAD DE EMPLEADOS [1]
            const queryResponse = await db.query(`SELECT COUNT(1) AS cantidadPersona
                FROM t_Alumno 
                UNION ALL
                SELECT COUNT(1)
                FROM t_Empleado`);
            // if(queryResponse.length <= 0){
            //     r = Message._404_NOT_FOUND;
            //     r.model!.message = "Ninguna Solicitud de Pago Encontrada.";
            //     statusResponse = Message._404_NOT_FOUND.code;
            // } else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = queryResponse;
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            // }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }
}

const ReporteController = new reporteController();
export default ReporteController;
