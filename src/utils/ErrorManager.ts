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
        status = 422;
    }else{
        r = Message._500_UNCONTROLLER_ERROR;
        r.model!.message = errJson.sqlMessage;
        status = 500;
    }
    return {
        estado: status,
        response: r.model
    };
}

export { setError };