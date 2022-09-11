import { defineStore } from 'pinia'


export const usePatientsStore = defineStore({
  id: 'patients',
  state: () => ({
    patients: [],
    currentPatient: {}
  }),
  getters: {
 
  },
  actions: {
     setPatients(patient) {
      this.currentPatient = {...patient};
    }
  }
})