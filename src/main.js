import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import { createPinia } from 'pinia'
import { i18n } from "./lang.js";


const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(i18n)
app.mount("#app");
