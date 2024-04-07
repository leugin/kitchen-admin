
export interface ResponseError {
    message:string,
    errors: [key: string]
}
export interface Response<T>{
    message?:string,
    errors?: any
    data?: T,
    success:boolean
}

