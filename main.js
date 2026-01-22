import { createApp } from "vue"
import { createPinia } from "pinia";
import { createRouter, createWebHashHistory } from 'vue-router'
import App from "./App.vue"
import HelloWorld from "./components/HelloWorld.vue"
import About from "./components/About.vue"

const app = createApp(App);
app.use(createPinia()); // Pinia ca în curs :contentReference[oaicite:2]{index=2}
app.use(router);
app.mount("#app");

const routes = [
{ path: "/", component: HelloWorld },
{ path: "/about", component: About },
];
const router = createRouter({
history: createWebHashHistory(),
routes,
});

createApp(App).use(router).mount("#app")