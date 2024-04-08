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

export const errorHandler = (e: any) => {
    console.log(e)
    if (e.code === 'ERR_NETWORK') {
        return { success: false, message:'Fallo la conexión por favor vuelva a intentar' }
    }
    if (e.status === 401) {
        localStorage.removeItem('token')
        location.reload()
    }
    return { success: false, errors: e.data }
}