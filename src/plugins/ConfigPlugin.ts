import type {App} from "vue";

export interface Config {
    apiUrl: string,
    baseUrl: string,
    mode: 'development',
}
export default  {
    install(app:App) {
        app.provide('config', {
            ...import.meta.env,
            apiUrl: import.meta.env.VITE_API_URL,
            baseUrl: import.meta.env.BASE_URL,
            mode: import.meta.env.MODE,
            prod: import.meta.env.PROD
        })
    }
}
