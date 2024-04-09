import { Http } from '@/service/Http'
import type { Response } from '@/interfaces/Response'
import {errorHandler} from "@/service/Interceptors";

export class Kitchen {
  static async paginate(params: {  } = {}): Promise<Response<any>> {
    try {
      return await Http.get('/kitchen/api/orders', params)
    } catch (e: any) {
       return errorHandler(e)
    }
  }

  static async create(quantity:number): Promise<Response<any>> {
    try {
      return await Http.post('/kitchen/api/orders', {quantity})
    } catch (e: any) {
      return errorHandler(e)
    }
  }
}
