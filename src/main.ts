import { createApp } from "vue";
import  "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import { createPinia } from 'pinia'
import { i18n } from "./lang.js";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "./apollo.ts";
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
// import { PrimeVue } from "@primevue/core";


const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(VueVirtualScroller)
app.use(i18n)
app.use(VCalendar, {})
app.provide(DefaultApolloClient, apolloClient)
// app.use(PrimeVue);
app.mount("#app");
