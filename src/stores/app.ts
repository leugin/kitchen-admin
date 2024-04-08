import { defineStore } from 'pinia'
import loader from "@/utils/loader";
export default  defineStore('appStorage',{
  state: () => ({
    ...loader.state(),
    menuOpen: false,
  }),
  getters: {
    ...loader.getters,
  },
  actions: {
    ...loader.actions,
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
})
