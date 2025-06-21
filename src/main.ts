import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// import './style.css'
import "@assets/css/tailwind.css";
import App from "./App.vue";
import router from "./router";
import test from "@assets/test.txt";
console.log(test);

// createApp(App).use(router).mount("#app");
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
