<script setup>

import { reactive, ref, watch } from 'vue'
import GenericField from "../components/genericField.vue";
import GeneticTextAreaVue from '../components/GeneticTextArea.vue';
import useGenericField from '../hooks/useGenericField';
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref as fireRef, uploadBytes, getMetadata, getDownloadURL } from "firebase/storage";
import { auth, firebaseApp } from '../firebaseConfig';
import Toaster from '../components/icons/CheckedIcon.vue';

import { storeToRefs } from 'pinia';
import ToxicItemList from '../components/ToxicItemList.vue';
import { usePatientsStore } from '../stores/patients';



const triggerToast = ref(false);

const router = useRouter();
const route = useRoute(); 
const { getCurrentPatient, resetToxicList } = usePatientsStore();
getCurrentPatient(route.params.id)
const { currentPatient: patient } = storeToRefs(usePatientsStore());
watch( patient, () => resetToxicList() );



const showSpinner = ref(false);

const imageFileSeleceted = ref();

const handleSubmition = async () => {
  showSpinner.value = true;
  const db = getFirestore(firebaseApp);
  const patientsCollection = collection(db, 'patients');
  const patientsSnapshot = await getDocs(patientsCollection);
  const newId = route.params.id;
  triggerToast.value = true;
  // Create a root reference
  const storage = getStorage();
  // Create a reference to 'mountains.jpg'
  const storageRef = fireRef(storage, imageFileSeleceted.value?.name);
  // 'file' comes from the Blob or File API
  try {
    const snapshot = await uploadBytes(storageRef, imageFileSeleceted.value);
    console.log('🚀snapshot >>', snapshot);
    console.log('Uploaded a blob or file!');
    const imagePath = snapshot.metadata.fullPath;
    const savedImageRef = fireRef(storage, imagePath);
    const urlImage = await getDownloadURL(savedImageRef);
    await setDoc(doc(db, "patients", newId), { ...patient, urlImage });
    const handleAfterSuccessOperation = () => {
      showSpinner.value = false;
      router.push("/dashboard");
    }
    setTimeout(handleAfterSuccessOperation, 1300);
  } catch (e) {
    console.log(e)
  }

}

const onImageSelected = (event) => {
  if (!Array.isArray(event.files)) return
  imageFileSeleceted.value = event.files[0];
  console.log('🚀imageFileSeleceted.value  >>', imageFileSeleceted.value);
}

const onImageRemoved = (event) => {
  imageFileSeleceted.value = "";
}

const onImageUploaded = (event) => {

}

const sendPicUrl = () => `haaaaaaaaaaaaaaaaaaaaa/accounts/uploadPicture`

const goBackToDetail = () => {
    router.push("/detail/"+route.params.id);
}


    </script>
    <template>
  <Toaster :isVisible="triggerToast" />
  <ProgressSpinner v-if="showSpinner" strokeWidth="8" />

  <div class="max-w-4xl mx-auto mt-3 shadow-2xl p-7 rounded-lg">
    <span class="back-icon" @click="goBackToDetail"><svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14.296 16.294a1 1 0 1 0 1.415 1.414l4.997-5.004a1 1 0 0 0 0-1.413L15.71 6.293a1 1 0 0 0-1.415 1.414L17.59 11H11a8 8 0 0 0-7.996 7.75L3 19a1 1 0 1 0 2 0 6 6 0 0 1 5.775-5.996L11 13h6.586l-3.29 3.294Z" fill="#212121"/></svg></span>
    <h4 class="body-font text-indigo-600 text-center mt-3">
      EDITAR DATOS PERSONALES DEL PACIENTE
    </h4>
    <form>
      <div class="relative z-0 mb-6 w-full group">
        <GenericField
          v-model="patient.email"
          name="floating_email"
          label="Correo Electrónico"
          :isEmail="true"
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
            label="Dirección"
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
          <GenericField v-model="patient.maritalStatus" label="Estado Civil" />
        </div>
      </div>
      <div class="grid xl:grid-cols-2 xl:gap-8">
        <div class="relative z-0 w-full group">
          <GenericField v-model="patient.entidad" label="Entidad" />
        </div>
        <div class="relative z-0 w-full group">
          <GenericField v-model="patient.régimen" label="Régimen" />
        </div>
      </div>
      <div class="grid xl:grid-cols-3 xl:gap-7 mt-4">
        <div class="relative w-full group z-0">
          <GenericField v-model="patient.región" label="Región" />
        </div>
        <div class="relative w-full group z-0">
          <GenericField v-model="patient.escolaridad" label="Escolaridad" />
        </div>
        <div class="relative w-full group z-0">
          <GenericField v-model="patient.alerta" label="Alerta" />
        </div>
        <div class="relative w-full group z-0">
          <GenericField v-model="patient.medico" label="Medico Tratante" />
        </div>
        <div class="relative w-full group z-0">
          <GenericField v-model="patient.especialidad" label="Especialidad" />
        </div>
      </div>
      <div class="grid xl:flex xl:gap-6 mt-4 w-full">
        <div class="group">Observaciones Medicas:</div>
        <div class="group w-full">            
          <GeneticTextAreaVue v-model="patient.observacionesMedicas" />
        </div>
      </div>
      <h4 class="body-font text-indigo-600 text-center mt-3">ANAMNESIS</h4>
      <div class="grid xl:flex xl:gap-2 mt-4 w-full">
        <div class="group">Motivo de Consulta:</div>
        <div class="group w-full">
          <GeneticTextAreaVue v-model="patient.motivoConsulta" />
        </div>
      </div>
      <div class="grid xl:flex xl:gap-6 mt-4 w-full">
        <div class="group">Enfermedades:</div>
        <div class="group w-full">
          <GeneticTextAreaVue v-model="patient.enfermedades" />
        </div>
      </div>
      <div class="grid xl:flex xl:gap-6 mt-4 w-full">
        <div class="group">Observaciones Generales:</div>
        <div class="group w-full">
          <GeneticTextAreaVue v-model="patient.observacioneGenerales" />
        </div>
      </div>
      <div class="grid xl:flex xl:gap-6 mt-4 w-full">
        <div class="group">Antecedentes Heredofamiliares</div>
        <div class="group w-full">
          <GeneticTextAreaVue v-model="patient.antecedentes" />
        </div>
      </div>
      <div class="grid xl:grid-cols-12 my-4 xl:gap-12">
        <div class="group w-full col-span-3">
          <b>Antecedentes Personales</b>
        </div>
        <div class="group w-full col-span-3">
          <p>Habitos Toxicos</p>
        </div>
        <div class="group w-full col-span-6">
          <div class="grid xl:grid-cols-5 xl:gap-5">
            <div>
              <input
                type="checkbox"
                class="mx-2"
                id="Alcohol"
                value="Alcohol"
                v-model="patient.habitosToxicos"
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
                v-model="patient.habitosToxicos"
              />
              <label class="cursor-pointer text-sm" for="Tabaco">Tabaco</label>
            </div>

            <div>
              <input
                type="checkbox"
                class="mx-2"
                id="Drogas"
                value="Drogas"
                v-model="patient.habitosToxicos"
              />
              <label class="cursor-pointer text-sm" for="Drogas">Drogas</label>
            </div>

            <div>
              <input
                type="checkbox"
                class="mx-2"
                id="Vacunas"
                value="Vacunas"
                v-model="patient.habitosToxicos"
              />
              <label class="cursor-pointer text-sm" for="Vacunas"
                >Vacunas</label
              >
            </div>

            <div>
              <input
                type="checkbox"
                class="mx-2"
                id="Ninguna"
                value="Ninguna"
                v-model="patient.habitosToxicos"
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
          <div>Fisiológicos</div>
          <div class="w-full">
            <GeneticTextAreaVue v-model="patient.fisiologicos" />
          </div>
        </div>
        <div class="xl:flex gap-4 justify-end">
          <div>Examenes</div>
          <div class="w-full">
            <GeneticTextAreaVue v-model="patient.examenes" />
          </div>
        </div>
        <div class="xl:flex gap-4 justify-end">
          <div>Frecuencia Cardiaca / Tensión Oxigeno</div>
          <div class="w-full">
            <GeneticTextAreaVue v-model="patient.frecuenciaCardiaca" />
          </div>
        </div>
        <div class="xl:flex gap-4 justify-end">
          <div>Entrenamiento / Distancia Recorrida Diaria</div>
          <div class="w-full">
            <GeneticTextAreaVue v-model="patient.entrenamiento" />
          </div>
        </div>
      </div>

      <div class="grid xl:grid-cols-1 my-8 border shadow">
        <h5>Sube tu foto de portada</h5>
        <FileUpload
          name="file"
          @select="onImageSelected"
          @remove="onImageRemoved"
          @upload="onImageUploaded"
          :multiple="false"
          :url="sendPicUrl()"
          chooseLabel="Escoger"
          :showUploadButton="false"
          uploadLabel="Subir"
          cancelLabel="Actualizar"
          accept="image/*"
          :maxFileSize="10000000"
        >
          <template #empty>
            <p>Arrastra y suelta los archivos aca para guardar.</p>
            <div class="current-image" v-if="patient?.urlImage">
            <img
                alt="ecommerce"
                class="
                    lg:w-1/2
                    w-full
                    lg:h-auto
                    h-64
                    object-cover object-center
                    rounded
                "
                :src="patient.urlImage"
                />
            </div>
            
          </template>
        </FileUpload>
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
    <style lang="scss">
.p-progress-spinner {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  z-index: 9999;
  &::after {
    content: "";
    position: fixed;
    background-color: #000000a1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translate3d(0, 0, 0) scale(17.5);
    z-index: -1;
  }

  svg {
    width: 10rem;
    height: 10rem;
    stroke-width: 4 !important;
  }
}
.p-fileupload .p-fileupload-content {
  height: 22rem;
}
.p-fileupload-row > div:first-child {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 !important;
  img {
    box-sizing: border-box;
    height: 100%;
    object-fit: cover;
    object-position: top;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
  }
}
.back-icon{
    cursor: pointer;
    font-size: 2rem;
    svg{
        transform: rotateY(180deg);
        transition: all .5s ease;
        &:hover{
            stroke-width: 5;
            font-weight: bold;
            transform: rotateY(180deg) scale(1.1515);
        }
    }
}
.current-image{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
}
</style>