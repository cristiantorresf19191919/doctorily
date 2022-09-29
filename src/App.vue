<template>
  <header class="text-gray-600 body-font">
    <div
      class="
        container
        mx-auto
        flex flex-wrap
        p-5
        flex-col
        md:flex-row
        items-center
      "
    >
      <a
        class="
          flex
          title-font
          font-medium
          items-center
          text-gray-900
          mb-4
          md:mb-0
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          ></path>
        </svg>
        <span class="ml-3 text-xl">MediEmergencias</span>
        <span class="ml-3 text-xs text-indigo-600" v-if="userLoggedin">{{
          userLoggedin
        }}</span>
      </a>
      <nav
        class="
          md:ml-auto md:mr-auto
          flex flex-wrap
          items-center
          text-base
          justify-center
        "
      >
        <a
          class="
            transition
            mr-5
            hover:text-gray-900
            text-indigo-600
            cursor-pointer
            hover:text-indigo-900 hover:text-lg
          "
        >
          <router-link to="/login"> INICIAR SESION</router-link></a
        >
        <a
          class="
            transition
            mr-5
            hover:text-gray-900
            text-indigo-600
            cursor-pointer
            hover:text-indigo-900 hover:text-lg
          "
        >
          <router-link to="/register"> REGISTRATE</router-link></a
        >
        <a
          class="
            transition
            mr-5
            hover:text-gray-900
            text-indigo-600
            cursor-pointer
            hover:text-indigo-900 hover:text-lg
          "
        >
          <router-link to="/dashboard"> BUSCAR PACIENTE </router-link></a
        >
        <a
          class="
            transition
            mr-5
            hover:text-gray-900
            text-indigo-600
            cursor-pointer
            hover:text-indigo-900 hover:text-lg
          "
        >
          <router-link to="/create"> REGISTRO HISTORIA CLINICA</router-link></a
        >
      </nav>
      <button
      @click="handleSignOut"
        class="
          inline-flex
          items-center
          bg-gray-100
          border-0
          py-1
          px-3
          focus:outline-none
          hover:bg-gray-200
          rounded
          text-base
          mt-4
          md:mt-0
        "
      >
        Cerrar Sesion
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-4 h-4 ml-1"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </header>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthorStore } from "./stores/author";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "./stores/auth";


const { userLoggedin } = storeToRefs(useAuthStore());

console.log('🚀userLoggedin >>',userLoggedin);
const router = useRouter()

const handleSignOut = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    router.push('/login');
  }).catch((error) => {
    router.push('/dashboard');
  });
}

</script>
