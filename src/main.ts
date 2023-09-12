import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia()).use(router).use(Toast, { position: 'top-center' }).mount('#app');
