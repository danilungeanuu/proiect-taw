import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "../pages/HomeView.vue";
import TrailsView from "../pages/TrailsView.vue";
import TrailDetailsView from "../pages/TrailsDetailsView.vue";
import FavoritesView from "../pages/FavoritesView.vue";
import ProfileView from "../pages/ProfileView.vue";

const router = createRouter({
  // IMPORTANT pentru Docker / dev server: Hash Mode e cel mai “safe”
  // (evită problemele de refresh / 404 pe rute). În curs apare createWebHashHistory. :contentReference[oaicite:4]{index=4}
  history: createWebHashHistory(),

  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/trails", name: "trails", component: TrailsView },
    { path: "/trails/:id", name: "trail-details", component: TrailDetailsView, props: true },
    { path: "/favorites", name: "favorites", component: FavoritesView },
    { path: "/profile", name: "profile", component: ProfileView },
  ],

  // Active link class (ca în curs) :contentReference[oaicite:5]{index=5}
  linkActiveClass: "is-active",
});

export default router;
