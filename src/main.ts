import './assets/main.css'
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/lara-dark-green/theme.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import primePlugin from "@/plugins/PrimePlugin";
import PusherPlugin from "@/plugins/PusherPlugin";
import ConfigPlugin from "@/plugins/ConfigPlugin";

const app = createApp(App)

app.use(createPinia())
    .use(ConfigPlugin)

app.use(router)
app.use(primePlugin)
app.use(PusherPlugin)

app.mount('#app')
