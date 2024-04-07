import type {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import userStorage from "@/stores/userStorage";
import {RouterAlias} from "@/router";
export default (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
    const userStore = userStorage();
    if (to.name !== RouterAlias.LOGIN  && !userStore.isAuthenticate) {
        return next({ name: RouterAlias.LOGIN })
    }
    if (to.name === RouterAlias.LOGIN && userStore.isAuthenticate) {
        return next({ name:RouterAlias.KITCHEN})
    }
    next()
}