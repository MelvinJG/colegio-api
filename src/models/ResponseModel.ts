export class ResponseModel {
    code: number | undefined;
    model: Model | undefined;
}

export class Model {
    code: any | undefined;
    message: string | undefined;
    data?: any;
}