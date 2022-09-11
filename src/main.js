import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { loadFonts } from './plugins/webfontloader'

const app = createApp(App)
loadFonts()

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
