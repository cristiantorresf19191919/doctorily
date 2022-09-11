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
    const patientsList = patientsSnapshot.docs.map( doc => doc.data());
    console.log('🚀patientsList >>',patientsList);
    if (!patientsList) return;
    patientsListState.value = [...patientsList];   
})

const seeDetails = ( patients ) => {
  setPatients(patients);
  router.push("/detail")
}

</script>
<template>
<section class="py-1 bg-blueGray-50">
  <div class="flex justify-center items-center flex-col">
    <h1 class="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">Pacientes Registrados</h1>
    <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-center">Pacientes registrados en la plataforma</p>
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
                          Ocupacion
                        </th>
           <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Numero de Documento
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
<footer class="relative pt-8 pb-6 mt-16">
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap items-center md:justify-between justify-center">
      <div class="w-full md:w-6/12 px-4 mx-auto text-center">
        <div class="text-sm text-blueGray-500 font-semibold py-1">
          Made with <a href="https://www.creative-tim.com/product/notus-js" class="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" class="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
        </div>
      </div>
    </div>
  </div>
</footer>
</section>
</template>
<style lang="scss" scoped>
</style>