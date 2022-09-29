<script setup>
import { onMounted, ref, reactive, } from '@vue/runtime-core';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { auth, firebaseApp } from '../firebaseConfig';  
import { doc, setDoc } from "firebase/firestore"; 
import { usePatientsStore } from "@/stores/patients";
import { useRouter } from 'vue-router';

const patientsListState = ref();

const { setPatients } = usePatientsStore();
const router = useRouter();
onMounted(async () => {
    const db = getFirestore(firebaseApp);
    const patientsCollection = collection(db, 'patients');
    const patientsSnapshot = await getDocs(patientsCollection);
    const patientsList = patientsSnapshot.docs.map( doc => ({...doc.data(), id:doc.id}));
    console.log('🚀patientsList >>',patientsList);
    if (!patientsList) return;
    patientsListState.value = [...patientsList];   
})

const seeDetails = ( patient) => {
  setPatients(patient);
  router.push("/detail/"+patient.id)
}

</script>
<template>
<section class="py-1 bg-blueGray-50">
  <div class="flex justify-center items-center flex-col">
    <h1 class="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">BUSCAR PACIENTES REGISTRADOS</h1>
    <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-center">Información de Pacientes Registrados en Plataforma</p>
  </div>
<div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
    <div class="block w-full overflow-x-auto">
      <table class="items-center bg-transparent w-full border-collapse ">
        <thead>
          <tr>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Nombre
                        </th>
          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Ocupación
                        </th>
           <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Número de Documento
                        </th>
          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Entidad
                        </th>      
          </tr>
        </thead>

        <tbody v-if="patientsListState">
          <tr @click="seeDetails(patient)" class="transition cursor-pointer hover:bg-slate-50" v-for="patient in patientsListState" :key="patient.cc">
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-indigo-700">{{patient.names}}</td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">{{patient.ocupation}}</td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">{{patient.cc}}</td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">{{patient.entidad}}</td>                   
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</div>

</section>
</template>
<style lang="scss" scoped>
</style>