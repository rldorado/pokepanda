import { createApp } from 'vue'
import App from './App.vue'

// INFO: State management
import { createPinia } from 'pinia'

// INFO: Router
import router from './router'

// INFO: UI library
import PrimeVue from 'primevue/config'
import PrimeTheme from '@primevue/themes/lara'
// INFO: CSS
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: { preset: PrimeTheme, options: { darkModeSelector: '.dark-mode' } }
})

app.mount('#app')
