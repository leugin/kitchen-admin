import { defineStore } from 'pinia'
import {Http} from "@/service/Http";
import {OAuth} from "@/service/OAuth";
import type {Response} from "@/interfaces/Response";

export default  defineStore('userStorage',{
    state: () => ({
        form:{
            email: '',
            password:''
        },
        errores: {
            email:[],
            password:[]
        },
        user: null,
        queue_count: 0
    }),
    getters: {
        isLoading: (state) => state.queue_count > 0,
        isAuthenticate: () => !!localStorage.getItem('token')
    },
    actions: {
        increments() {
            this.queue_count++;
        },
        decrement() {
            this.queue_count--;
        },
        async login(){
            this.increments()
            this.clearErrors()
            const response = await OAuth.login(this.form)
            if (!response.success) {
                console.log(response.errors)
               this.errores =  response.errors.errors
            }
            this.decrement()
            return response
        },
        async me() {
            const response = await Http.get<Response<any>>('/oauth/api/me')
            if (response.success) {
                this.user = response.data
            }
            return response
        },
        async logout() {
            await Http.post('/oauth/api/logout');
            this.removeToken();
        },
        setToken(token:string) {
            localStorage.setItem('token', token)
        },
        removeToken() {
            localStorage.removeItem('token')
            return true;
        },
        clearErrors() {
            this.errores.email.splice(0, this.errores.email.length)
            this.errores.password.splice(0, this.errores.password.length)
        }
    }
})