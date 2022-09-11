import { defineStore } from 'pinia'


export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    userLoggedin: ""
  }),
  getters: {
 
  },
  actions: {
     setUser(email) {
      this.userLoggedin = email;
    }
  }
})