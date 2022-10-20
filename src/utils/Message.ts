export const ResponseCode = {
    _200_OPERATION_SUCCESSFUL: 200,
    _401_UNAUTHORIZED: 401,
    _404_NOT_FOUND: 404,
    _405_METHOD_NOT_ALLOWED: 405,
    _422_INTERNAL_ERROR: 422,
    _500_UNCONTROLLER_ERROR: 500,
    _503_SERVICE_UNVAILABLE: 503
}

export const Message = {
    _200_OPERATION_SUCCESSFUL: {code: ResponseCode._200_OPERATION_SUCCESSFUL, model: { code: "OPERATION_SUCCESSFUL", message: "Operación exitosa"}},
    _401_UNAUTHORIZED: {code: ResponseCode._401_UNAUTHORIZED, model: { code: "UNAUTHORIZED", message: "Servicio no autorizado"}},
    _404_NOT_FOUND: {code: ResponseCode._404_NOT_FOUND, model: { code: "NOT_FOUND", message: "Servicio no encontrado"}},
    _405_METHOD_NOT_ALLOWED: {code: ResponseCode._405_METHOD_NOT_ALLOWED, model: { code: "METHOD_NOT_ALLOWED", message: "Método no permitido"}},
    _422_INTERNAL_ERROR: {code: ResponseCode._422_INTERNAL_ERROR, model: { code: "INTERNAL_ERROR", message: "Error en operación interna"}},
    _500_UNCONTROLLER_ERROR: {code: ResponseCode._500_UNCONTROLLER_ERROR, model: { code: "UNCONTROLLER_ERROR", message: "Error no controlado"}},
    _503_SERVICE_UNVAILABLE: {code: ResponseCode._503_SERVICE_UNVAILABLE, model: { code: "SERVICE_UNVAILABLE", message: "Servicio no disponible"}}
}