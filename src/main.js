import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import vuetify from './plugins/Vuetify'

const app = createApp(App)
const pinia = createPinia();

app.use(router).use(pinia).use(vuetify).mount('#app');