import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { loadFonts } from './plugins/webfontloader'
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import "primevue/resources/themes/md-light-indigo/theme.css"
import "primevue/resources/primevue.min.css"
import FileUpload from 'primevue/fileupload';
import ProgressSpinner from 'primevue/progressspinner';

loadFonts()

createApp(App)
  .use(createPinia())
  .use(PrimeVue,{ripple:true}) 
  .component('FileUpload',FileUpload)
  .component('ProgressSpinner',ProgressSpinner)
  .use(router)
  .mount('#app')

