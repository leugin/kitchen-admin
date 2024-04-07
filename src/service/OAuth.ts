import { Http } from '@/service/Http'
import type { Response } from '@/interfaces/Response'
import type {LoginData} from "@/interfaces/OAuthInterfaces";


export class OAuth {
  static async login(params: { email: string; password: string }): Promise<Response<LoginData>> {
    try {
      return await Http.post('/oauth/api/login', params)
    } catch (e: any) {
      return { success: false, errors: e.data }
    }
  }
}
