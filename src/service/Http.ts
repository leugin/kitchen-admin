import axios from "axios";
import {errorTransformer, sanitize} from "@/service/Interceptors";
const url = import.meta.env.VITE_API_URL
const bearer = localStorage.getItem('token')

axios.interceptors.response.use(sanitize, errorTransformer);
if (bearer){
    axios.defaults.headers.common['Authorization'] = `Bearer ${bearer}`
}
export class Http {
    static async get(path:string, data:any = {}):Promise<any>{
        return await axios.get(`${url}${path}`, {
            params: data,
        })
    }
    static async post(path:string, data:any = {}): Promise<any> {
        return await axios.post(`${url}${path}`, data)
    }
}