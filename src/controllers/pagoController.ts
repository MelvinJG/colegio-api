import { Request, Response } from 'express'
import { ResponseModel } from '../models/ResponseModel'
import { Message } from '../utils/Message'
import db from '../database';
import { setError } from '../utils/ErrorManager';

let r: ResponseModel = new ResponseModel();
let statusResponse: number;

class pagoController {
    async realizarPagoVariosADMIN(req: Request, res: Response){
        try{
            const TIPO_DE_PAGO = req.body.tipo_pago_Id;
            const CUI_ALUMNO = req.body.cui_Alumno;
            const DPI_EMPLEADO = req.body.dpi_Empleado;
            let pago_Actaual_Id;
            let queryResponse: any;
            let queryPagoActual: any;
            if(TIPO_DE_PAGO === 1 || TIPO_DE_PAGO === 2){
                // Paso inscripcion y colegiatura TABAL ALUMNOS
                queryPagoActual = await db.query(`SELECT (MAX(pago_Id) + 1) AS pago_Actual FROM t_Pago_Colegio`);// Obtener el ID del pago actual 
                queryResponse = await db.query(`INSERT INTO t_Pago_Colegio SET ? `,[req.body]);
            } else if(TIPO_DE_PAGO === 3){ 
                // Pago salarial TABLA EMPLEADOS
                queryPagoActual = await db.query(`SELECT (MAX(pago_Id) + 1) AS pago_Actual FROM t_Pago_Salarial`);// Obtener el ID del pago actual 
                queryResponse = await db.query(`INSERT INTO t_Pago_Salarial SET ? `,[req.body]);
            } else { 
                // Codigo de Pago desconocido
                r = Message._422_INTERNAL_ERROR;
                statusResponse = Message._422_INTERNAL_ERROR.code;
            }
            // Seteamos valor Pago Actual ID
            if(queryPagoActual[0].pago_Actual === null ){
                pago_Actaual_Id = 1;
            } else {
                pago_Actaual_Id = queryPagoActual[0].pago_Actual;
            }
            // Validamos respuesta del INSERT del pago
            if(queryResponse.length <= 0 || queryResponse.affectedRows != 1){
                r = Message._422_INTERNAL_ERROR;
                statusResponse = Message._422_INTERNAL_ERROR.code;
            } else {
                if(TIPO_DE_PAGO === 1){ 
                    /*PAGO INSCRIPCION - ACTUALIZAR TABLA ALUMNO pago_Inscripcion = 'SI'*/
                    await db.query(`UPDATE t_Alumno SET pago_Inscripcion = 'SI' WHERE cui_Alumno = '${CUI_ALUMNO}'`);
                } else if(TIPO_DE_PAGO === 2){ 
                    /*PAGO COLEGIATURA - ACTUALIZAR TABLA ALUMNO detalle_Ultimo_Pago CON ID DEL PAGO*/
                    await db.query(`UPDATE t_Alumno SET detalle_Ultimo_Pago = ${pago_Actaual_Id} WHERE cui_Alumno = '${CUI_ALUMNO}'`);
                } else if(TIPO_DE_PAGO === 3){ 
                    /*PAGO SALARIAL - ACTUALIZAR TABLA EMPLEADO detalle_Ultimo_Pago CON ID DEL PAGO*/
                    await db.query(`UPDATE t_Empleado SET detalle_ultimo_Pago = ${pago_Actaual_Id} WHERE dpi_Empleado = '${DPI_EMPLEADO}'`);
                } 
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = 'Pago Realizado Correctamente';
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

const PagoController = new pagoController();
export default PagoController;

/**INSCRIPCION 
 * 
{
    "tipo_pago_Id": 1,
    "origen_pago_Id": 1, VALORES 1 O 2
    "monto": 500,
    "cui_Alumno": "Alum1",
    "usuario_Registro": "melvin_joj"
}
*/

/**COLEGIATURA
 * 
{
    "tipo_pago_Id": 2,
    "origen_pago_Id": 2,  VALORES 1 O 2
    "monto": 200.5,
    "cui_Alumno": "Alum1",
    "mes_Id": 1,
    "usuario_Registro": "melvin_joj"
}
*/
// ID ES NUMERO
/**SALARIO 
 * 
{
    "tipo_pago_Id": 3,
    "monto": 8000,
    "dpi_Empleado": "EMP2",
    "mes_Id": 1,
    "usuario_Registro": "melvin_joj"
}
*/