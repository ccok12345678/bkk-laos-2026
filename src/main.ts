import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import './assets/main.css';

// Apply theme before mount to avoid flash
const stored = localStorage.getItem('app.theme');
const parsed = stored ? stored.replace(/^"|"$/g, '') : 'system';
const isDark =
  parsed === 'dark' ||
  (parsed === 'system' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches);
document.documentElement.classList.toggle('dark', isDark);

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
