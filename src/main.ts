import './assets/main.css'
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/lara-light-green/theme.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import primePlugin from "@/plugins/PrimePlugin";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(primePlugin)

app.mount('#app')
