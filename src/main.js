import { createApp } from 'vue' // Создание проекта на фраймворке Vue.js
import './style.css'
import App from './App.vue'
import router from './router' // Использование библиотеки маршрутизации
import { createPinia } from 'pinia' // Использование библиотеки pinia для создания сторов
import vuetify from './plugins/Vuetify' // Использование библиотеки vuetify

const app = createApp(App)
const pinia = createPinia();

app.use(router).use(pinia).use(vuetify).mount('#app');