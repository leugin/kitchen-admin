import { Http } from '@/service/Http'
import type { Response } from '@/interfaces/Response'

const errorHandler = (e: any) => {
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
export class Kitchen {
  static async orders(params: {  } = {}): Promise<Response<any>> {
    try {
      return await Http.get('/kitchen/api/orders', params)
    } catch (e: any) {
       return errorHandler(e)
    }
  }
}
