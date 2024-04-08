import { Http } from '@/service/Http'
import type { Response } from '@/interfaces/Response'
import {errorHandler} from  '@/service/Interceptors'
export class Warehouse {
  static async paginate(params: {  } = {}): Promise<Response<any>> {
    try {
      return await Http.get('/warehouse/api/warehouse', params)
    } catch (e: any) {
       return errorHandler(e)
    }
  }
}
