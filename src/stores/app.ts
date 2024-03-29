import { defineStore } from 'pinia'

export default  defineStore('appStorage',{
  state: () => ({
    menuOpen: false,
  }),
  actions: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
})
