import { ResponseModel } from '../models/ResponseModel'
import { Message } from '../utils/Message'

let r: ResponseModel = new ResponseModel();

function setError(err: any): any{
    let errJson = JSON.parse(JSON.stringify(err));
    let status: number;
    if(errJson.code === 'ER_DUP_ENTRY' || errJson.errno === 1062){
        r = Message._422_INTERNAL_ERROR;
        r.model!.code = "REGISTRATION_DUPLICATE";
        r.model!.message = errJson.sqlMessage
        status = Message._422_INTERNAL_ERROR.code;
    } else if (errJson.message === "jwt expired" || errJson.name === "TokenExpiredError"){
        r = Message._401_UNAUTHORIZED;
        r.model!.message = "Token Vencido, Inicie Sesión Nuevamente"
        status = Message._401_UNAUTHORIZED.code;
    } else if (errJson.message === "invalid signature" || errJson.name === "JsonWebTokenError"){
        r = Message._500_UNCONTROLLER_ERROR;
        r.model!.message = "Token Inválido, Necesita Iniciar Sesión"
        status = Message._401_UNAUTHORIZED.code;
    }
    else{
        r = Message._500_UNCONTROLLER_ERROR;
        r.model!.message = errJson.sqlMessage;
        status = Message._500_UNCONTROLLER_ERROR.code;
    }
    return {
        estado: status,
        response: r.model
    };
}

export { setError };