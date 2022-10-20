import { Request, Response } from 'express'
import { ResponseModel } from '../models/ResponseModel'
import { Message } from '../utils/Message'
import db from '../database';
import { setError } from '../utils/ErrorManager';

let r: ResponseModel = new ResponseModel();
let statusResponse: number;

class productoController {
    async addProducto(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`INSERT INTO t_Producto SET ? `,[req.body]);
            if(queryResponse.length <= 0 || queryResponse.affectedRows != 1){
                r = Message._422_INTERNAL_ERROR;
                statusResponse = Message._422_INTERNAL_ERROR.code;
            } else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = 'Producto Agregado Correctamente';
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    async getProductos(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`SELECT producto_Id, UPPER(nombre_Producto) AS nombre_Producto, cantidad, precio, foto FROM t_Producto WHERE eliminado = 'NO'`);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Productos No Encontrados"
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

    async getProductoPorID(req: Request, res: Response){
        try{
            const queryResponse = await db.query('SELECT producto_Id, nombre_Producto, cantidad, precio, foto FROM t_Producto WHERE producto_Id = ?', req.params.id);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Producto No Encontrado"
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

    async updateProducto(req: Request, res: Response){
        try{
            const queryResponse = await db.query(`UPDATE t_Producto SET ? , fecha_Actualizacion = now() WHERE producto_Id = ?`,[req.body,req.params.id]);
            if(queryResponse.length <= 0 || queryResponse.affectedRows != 1){
                r = Message._422_INTERNAL_ERROR;
                statusResponse = Message._422_INTERNAL_ERROR.code;
            } else {
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = 'Producto Actualizado Correctamente';
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    async deleteProducto(req: Request, res: Response){
        try{
            const queryDelete = await db.query(`UPDATE t_Producto SET ? , fecha_Eliminacion = now(), eliminado = 'SI' WHERE producto_Id = ?`,[req.body,req.params.id]);
            // const queryDelete = await db.query('DELETE FROM t_Producto WHERE producto_Id = ?', req.params.id);
            if(queryDelete.affectedRows === 1){
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = 'Producto Eliminado Correctamente';
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

    async venderProducto(req: Request, res: Response){
        try{
            let ultima_Venta: number;
            let productos: any;
            const querySelect = await db.query(`SELECT (MAX(venta_Id) + 1) AS ultima_Venta FROM t_Venta_Producto`);
            if(querySelect[0].ultima_Venta === null ){
                ultima_Venta = 1;
            } else {
                ultima_Venta = querySelect[0].ultima_Venta
            };
            productos = req.body.productos;
            delete req.body.productos;
            const queryResponse = await db.query(`INSERT INTO t_Venta_Producto SET ? `,[req.body]);
            if(queryResponse.length <= 0 || queryResponse.affectedRows != 1){
                r = Message._422_INTERNAL_ERROR;
                statusResponse = Message._422_INTERNAL_ERROR.code;
            } else {
                // 200 - OK
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = 'Venta Realizada Correctamente';
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
                for(const index in productos){
                    delete productos[index].nombre_Producto;
                    delete productos[index].precio;
                    const finalResultInsertProductos = Object.assign({venta_Id: ultima_Venta},productos[index]);
                    const queryResponseProducto = await db.query(`INSERT INTO t_Interseccion_Venta SET ? `,[finalResultInsertProductos]);
                    if(queryResponseProducto.length <= 0 || queryResponseProducto.affectedRows != 1){
                        r = Message._422_INTERNAL_ERROR;
                        statusResponse = Message._422_INTERNAL_ERROR.code;
                    } else {
                        // 200 - OK
                        // Actualizar cantidades de los productos
                        const cantidadActual = await db.query(`SELECT cantidad FROM t_Producto WHERE producto_Id = ${finalResultInsertProductos.producto_Id}`);
                        await db.query(`UPDATE t_Producto SET cantidad = (${cantidadActual[0].cantidad} - ${finalResultInsertProductos.cantidad}) WHERE producto_Id = ${finalResultInsertProductos.producto_Id}`);
                    }
                }
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    };
}

const ProductoController = new productoController();
export default ProductoController;

//FUNCIONALIDAD CODIGO con el JSON recibo en la tabla
/*
async venderProducto(req: Request, res: Response){
        try{
            let ultima_Venta: number;
            let productos: any;
            let reciboJSON = {
                json_Recibo: JSON.stringify(req.body) // Validar si es necesario agregar la fecha en el recibo JSON
            };
            const querySelect = await db.query(`SELECT (MAX(venta_Id) + 1) AS ultima_Venta FROM t_Venta_Producto`);
            if(querySelect[0].ultima_Venta === null ){
                ultima_Venta = 1;
            } else {
                ultima_Venta = querySelect[0].ultima_Venta
            };
            productos = req.body.productos;
            delete req.body.productos;
            const finalResultInsertVenta = Object.assign(req.body,reciboJSON);
            const queryResponse = await db.query(`INSERT INTO t_Venta_Producto SET ? `,[finalResultInsertVenta]);
            if(queryResponse.length <= 0 || queryResponse.affectedRows != 1){
                r = Message._422_INTERNAL_ERROR;
                statusResponse = Message._422_INTERNAL_ERROR.code;
            } else {
                // 200 - OK
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = 'Venta Realizada Correctamente';
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
                for(const index in productos){
                    delete productos[index].nombre_Producto;
                    delete productos[index].precio;
                    const finalResultInsertProductos = Object.assign({venta_Id: ultima_Venta},productos[index]);
                    const queryResponseProducto = await db.query(`INSERT INTO t_Interseccion_Venta SET ? `,[finalResultInsertProductos]);
                    if(queryResponseProducto.length <= 0 || queryResponseProducto.affectedRows != 1){
                        r = Message._422_INTERNAL_ERROR;
                        statusResponse = Message._422_INTERNAL_ERROR.code;
                    } else {
                        // 200 - OK
                        // Actualizar cantidades de los productos
                        const cantidadActual = await db.query(`SELECT cantidad FROM t_Producto WHERE producto_Id = ${finalResultInsertProductos.producto_Id}`);
                        await db.query(`UPDATE t_Producto SET cantidad = (${cantidadActual[0].cantidad} - ${finalResultInsertProductos.cantidad}) WHERE producto_Id = ${finalResultInsertProductos.producto_Id}`);
                    }
                }
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    };
*/


//PETICION POSTMAN con el JSON recibo en la tabla
/*
{
    "usuario_Registro": "melvin_joj",
    "motivo": "Compra de uniformes diario y fisica",
    "monto": 482,
    "productos": [
        {
            "producto_Id": 1,
            "cantidad": 1,
            "nombre_Producto": "Uniforme de Fisica",
            "precio": 150.5
        },
        {
            "producto_Id": 2,
            "cantidad": 3,
            "nombre_Producto": "Uniforme de Diario",
            "precio": 110.5
        }
    ]
}
*/