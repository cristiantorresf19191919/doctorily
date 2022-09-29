import { defineStore } from "pinia";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { auth, firebaseApp } from "../firebaseConfig";

export const usePatientsStore = defineStore({
  id: "patients",
  state: () => ({
    patients: [],
    currentPatient: {},
  }),
  getters: {},
  actions: {
    setPatients(patient) {
      this.currentPatient = { ...patient };
    },
    async getCurrentPatient(firebaseID) {
      const db = getFirestore(firebaseApp);
      const docRef = doc(db, "patients", firebaseID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.currentPatient = docSnap.data();
      } else {      
        console.log("No such document!");
      }  
    },
    resetToxicList(){
      if (this.currentPatient.habitosToxicos.includes('Ninguna')) {
        this.currentPatient.habitosToxicos = [];
      }
    }
  },
});
