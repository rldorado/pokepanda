import { createApp } from 'vue'
import App from './App.vue'

// INFO: State management
import { createPinia } from 'pinia'

// INFO: Router
import router from './router'

// INFO: UI library
import PrimeVue from 'primevue/config'

import 'primevue/resources/themes/soho-light/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')
