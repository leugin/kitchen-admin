import type {AxiosResponse} from "axios";

export const sanitize = (response:AxiosResponse<any, any>) => {
    return response.data ?? {
        success:true
    };
}

export const errorTransformer = (error:any) => {
    return Promise.reject({
        success:false,
        code:error?.code,
        status:error?.response?.status,
        statusText:error?.response?.statusText,
        data:error?.response?.data ?? {},
    })
}

