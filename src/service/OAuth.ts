import { Http } from '@/service/Http'
import type { Response } from '@/interfaces/Response'
import type {LoginData} from "@/interfaces/OAuthInterfaces";
import {errorHandler} from "@/service/Interceptors";


export class OAuth {
  static async login(params: { email: string; password: string }): Promise<Response<LoginData>> {
    try {
      return await Http.post('/oauth/api/login', params)
    } catch (e: any) {
      return errorHandler(e)
    }
  }
  static async me():Promise<Response<any>>{
    try {
      return await Http.get('/oauth/api/me')
    } catch (e: any) {
      return errorHandler(e)
    }
  }
  static async logout(): Promise<Response<null>> {
    try {
      return await Http.post('/oauth/api/logout')
    } catch (e: any) {
      return errorHandler(e)
    }
  }

}
