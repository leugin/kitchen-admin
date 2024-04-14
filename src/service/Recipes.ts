import { Http } from '@/service/Http'
import type { Response } from '@/interfaces/Response'
import {errorHandler} from  '@/service/Interceptors'
export default class Recipes {
  static async paginate(params: {  } = {}): Promise<Response<any>> {
    try {
      return await Http.get('/kitchen/api/recipes', params)
    } catch (e: any) {
       return errorHandler(e)
    }
  }
}
