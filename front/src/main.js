import { createApp } from "vue";

import "./style.css";
import App from "./App.vue";
import store from "./store";
import router from "./router/index.js";

const app = createApp(App).use(router).use(store);

app.mount("#app");
