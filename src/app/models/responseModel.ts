export interface ResponseModel<T>{
    sucess: boolean,
    message: string,
    data: T
}