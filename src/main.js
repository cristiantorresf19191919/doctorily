import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { loadFonts } from './plugins/webfontloader'
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';


loadFonts()

createApp(App)
  .use(createPinia())
  .use(PrimeVue)
  .use(router)
  .mount('#app')

