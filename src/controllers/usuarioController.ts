import { Request, Response } from 'express'
import { ResponseModel } from '../models/ResponseModel'
import { Message } from '../utils/Message'
import db from '../database';
import { setError } from '../utils/ErrorManager';
//JSON WEB TOKEN
const jwt = require('jsonwebtoken');

import * as dotenv from "dotenv";
dotenv.config();

let r: ResponseModel = new ResponseModel();
let statusResponse: number;

class userController {
    async getUsuarios(req: Request, res: Response){
        try{
            const queryResponse = await db.query('SELECT * FROM t_Usuario');
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Usuarios No Encontrados"
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

    async singin(req: Request, res: Response){
        try{
            const {userName, pass} = req.body;
            const queryResponse = await db.query(`SELECT U.userName, U.roleId, U.id_usuario, E.foto AS 'EmpFoto', A.foto AS 'AlumFoto'
            FROM t_Usuario U
            LEFT JOIN t_Empleado E ON U.id_usuario = E.dpi_Empleado
            LEFT JOIN t_Alumno A ON U.id_usuario = A.cui_Alumno WHERE userName = ? AND pass = ?`, [userName, pass]);
            if(queryResponse.length <= 0){
                r = Message._404_NOT_FOUND;
                r.model!.message = "Usuario o Contraseña Incorrecta" //Usuario No Encontrado
                statusResponse = Message._404_NOT_FOUND.code;
            } else if(queryResponse[1]){ //EJ. Cuando haya dos registron con mismo Id (No pasará por la primary key pero por si acaso XD)
                r = Message._422_INTERNAL_ERROR;
                statusResponse = Message._422_INTERNAL_ERROR.code;
            } else { 
                let data = JSON.parse(JSON.stringify(queryResponse[0]));
                const token = jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn: '0.5h'})
                r = Message._200_OPERATION_SUCCESSFUL;
                r.model!.data = {token}//queryResponse[0]
                statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            }
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }

    async test(req: Request, res: Response){
        try{
            console.log("DATA TOKEN -> ", req.accepted)
            console.log("RECIBO BODY POSTAMAN -> ", req.body)
            console.log("RECIBO PARAMS POSTMAN -> ", req.params)
            r = Message._200_OPERATION_SUCCESSFUL;
            r.model!.data = req.body;
            statusResponse = Message._200_OPERATION_SUCCESSFUL.code;
            
            res.status(statusResponse).json(r.model);
        }
        catch(err){
            const {estado, response} = setError(err);
            res.status(estado).json(response);
        }
    }
}

const UserController = new userController();
export default UserController;
