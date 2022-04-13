import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import Phosphor from "phosphor-vue";

createApp(App).use(store).use(router).use(Phosphor).mount("#app");
