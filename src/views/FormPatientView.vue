<script setup>

import { reactive, ref, watch } from 'vue'
import GenericField from "../components/genericField.vue";
import GeneticTextAreaVue from '../components/GeneticTextArea.vue';
import useGenericField from '../hooks/useGenericField';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { auth, firebaseApp } from '../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import Toaster from '../components/icons/CheckedIcon.vue';

const patient = reactive({ names: '', cc: '', email: '', city: '', toxicBehaviors: [] })
const triggerToast = ref(false);

watch(patient, () => {
  if (patient.toxicBehaviors.includes('Ninguna')) {
    patient.toxicBehaviors = [];
  }
});

const router = useRouter();

const handleSubmition = async () => {
  const db = getFirestore(firebaseApp);
  const patientsCollection = collection(db, 'patients');
  const patientsSnapshot = await getDocs(patientsCollection);
  await setDoc(doc(db, "patients", uuidv4()), { ...patient });
  triggerToast.value = true;
  setTimeout(() => router.push("/dashboard"), 1300);
}


</script>
<template>
  <Toaster :isVisible="triggerToast" />
  <div class="max-w-4xl mx-auto mt-3 shadow-2xl p-7 rounded-lg">
    <h4 class="body-font text-indigo-600 text-center mt-3">
      Datos personales del paciente
    </h4>
    <form>
      <div class="relative z-0 mb-6 w-full group">
        <GenericField
          v-model="patient.email"
          name="floating_email"
          label="correo electronico"
        />
      </div>
      <div class="relative z-0 mb-6 w-full group">
        <GenericField
          v-model="patient.cc"
          name="floating_email"
          label="Documento de identidad"
        />
      </div>
      <div class="relative z-0 mb-6 w-full group">
        <GenericField
          v-model="patient.names"
          name="floating_email"
          label="Nombre Apellidos"
        />
      </div>
      <div class="grid xl:grid-cols-3 xl:gap-6">
        <div class="relative z-0 mb-6 w-full group">
          <GenericField
            v-model="patient.city"
            name="floating_email"
            label="Ciudad"
          />
        </div>
        <div class="relative z-0 mb-6 w-full group">
          <GenericField
            v-model="patient.departamento"
            name="floating_email"
            label="Departamento"
          />
        </div>
        <div class="relative z-0 mb-6 w-full group">
          <GenericField
            v-model="patient.address"
            name="floating_email"
            label="Direccion"
          />
        </div>
        <div class="relative z-0 mb-6 w-full group">
          <GenericField
            v-model="patient.sex"
            name="floating_email"
            label="Sexo"
          />
        </div>
        <div class="relative z-0 mb-6 w-full group">
          <GenericField
            v-model="patient.ocupation"
            name="floating_email"
            label="Ocupacion"
          />
        </div>
        <div class="relative z-0 mb-6 w-full group">
          <GenericField v-model="patient.maritalStatus" label="Estado civil" />
        </div>
      </div>
      <div class="grid xl:grid-cols-2 xl:gap-8">
        <div class="relative z-0 w-full group">
          <GenericField v-model="patient.entidad" label="Entidad" />
        </div>
        <div class="relative z-0 w-full group">
          <GenericField v-model="patient.regimen" label="Regimen" />
        </div>
      </div>
      <div class="grid xl:grid-cols-3 xl:gap-7 mt-4">
        <div class="relative w-full group z-0">
          <GenericField v-model="patient.region" label="Region" />
        </div>
        <div class="relative w-full group z-0">
          <GenericField v-model="patient.escolaridad" label="Escolaridad" />
        </div>
        <div class="relative w-full group z-0">
          <GenericField v-model="patient.alerta" label="Alerta" />
        </div>
      </div>
      <h4 class="body-font text-indigo-600 text-center mt-3">Anamnesis</h4>
      <div class="grid xl:flex xl:gap-2 mt-4 w-full">
        <div class="group">Motivo de Consulta:</div>
        <div class="group w-full">
          <GeneticTextAreaVue v-model="patient.reason" />
        </div>
      </div>
      <div class="grid xl:flex xl:gap-6 mt-4 w-full">
        <div class="group">Enfermedades:</div>
        <div class="group w-full">
          <GeneticTextAreaVue v-model="patient.diseases" />
        </div>
      </div>

      <div class="grid xl:grid-cols-12 my-4 xl:gap-12">
        <div class="group w-full col-span-3">
          <b>Antecedentes heredofamiliares</b>
        </div>
        <div class="group w-full col-span-3">
          <p>Ingrese enfermedades heredadas</p>
        </div>
        <div class="group w-full col-span-6">
          <GeneticTextAreaVue v-model="patient.diseases" />
        </div>

        <div class="group w-full col-span-3">
          <b>Antecedentes personales</b>
        </div>
        <div class="group w-full col-span-3">
          <p>Habitos toxicos</p>
          <!-- <p>toxic state =>  {{patient.toxicBehaviors}}</p> -->
        </div>

        <div class="group w-full col-span-6">
          <div class="grid xl:grid-cols-5 xl:gap-5">
            <div>
              <input
                type="checkbox"
                class="mx-2"
                id="Alcohol"
                value="Alcohol"
                v-model="patient.toxicBehaviors"
              />
              <label class="text-sm cursor-pointer" for="Alcohol"
                >Alcohol</label
              >
            </div>

            <div>
              <input
                type="checkbox"
                class="mx-2"
                id="Tabaco"
                value="Tabaco"
                v-model="patient.toxicBehaviors"
              />
              <label class="cursor-pointer text-sm" for="Tabaco">Tabaco</label>
            </div>

            <div>
              <input
                type="checkbox"
                class="mx-2"
                id="Drogas"
                value="Drogas"
                v-model="patient.toxicBehaviors"
              />
              <label class="cursor-pointer text-sm" for="Drogas">Drogas</label>
            </div>

            <div>
              <input
                type="checkbox"
                class="mx-2"
                id="Infusiones"
                value="Infusiones"
                v-model="patient.toxicBehaviors"
              />
              <label class="cursor-pointer text-sm" for="Infusiones"
                >Infusiones</label
              >
            </div>

            <div>
              <input
                type="checkbox"
                class="mx-2"
                id="Ninguna"
                value="Ninguna"
                v-model="patient.toxicBehaviors"
              />
              <label class="cursor-pointer text-sm" for="Ninguna"
                >Ninguna</label
              >
            </div>
          </div>
        </div>
      </div>

      <div class="grid xl:grid-cols-2 my-8 xl:gap-8">
        <div class="xl:flex gap-4">
          <div>Fisiologicos</div>
          <div class="w-full">
            <GeneticTextAreaVue v-model="patient.fisiologics" />
          </div>
        </div>
        <div class="xl:flex gap-4 justify-end">
          <div>Examenes</div>
          <div class="w-full">
            <GeneticTextAreaVue v-model="patient.examns" />
          </div>
        </div>
      </div>

      <div class="lg:flex lg:gap-4 lg:justify-center">
        <button
          type="button"
          @click="patient = {}"
          class="
            xl:inline
            text-white
            bg-red-700
            hover:bg-red-800
            focus:ring-4 focus:ring-red-300
            font-medium
            rounded-lg
            text-sm
            w-full
            sm:w-auto
            px-5
            py-2.5
            text-center
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
          "
        >
          Borrar
        </button>

        <button
          type="button"
          @click="handleSubmition()"
          class="
            xl:inline
            text-white
            bg-blue-700
            hover:bg-blue-800
            focus:ring-4 focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            w-full
            sm:w-auto
            px-5
            py-2.5
            text-center
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
          "
        >
          Enviar
        </button>
      </div>
    </form>
  </div>
</template>
<style lang="sass">
svg.success-icon
    position: absolute
    top: 7px
    left: 6px
</style>