import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import BootstrapVue3 from 'bootstrap-vue-3'

const app = createApp(App)

app.use(createPinia())
app.use(BootstrapVue3)

app.mount('#app')