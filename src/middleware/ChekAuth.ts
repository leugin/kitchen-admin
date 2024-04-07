import type {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import userStorage from "@/stores/userStorage";
export default (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
    const userStore = userStorage();
    if (to.name !== 'login'  && !userStore.isAuthenticate) {
        return next({ name: 'login' })
    }
    if (to.name === 'login' && userStore.isAuthenticate) {
        return next({ name:'dashboard'})
    }
    next()
}