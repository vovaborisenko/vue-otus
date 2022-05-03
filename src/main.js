import { createApp } from 'vue';
import Toast from 'vue-toastification';

import 'vue-toastification/dist/index.css';
import '@/assets/styles/main.scss';

import AnimateTitle from '@/directives/animate-title';
import '@/directives/animate-title/styles.scss';
import App from './App.vue';
import './utils/string';

const app = createApp(App);

app.directive('animate-title', AnimateTitle);

app.use(Toast);

app.mount('#app');
