import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import UserSettings from "../components/UserSettings.vue";
import WishList from "../components/WishList.vue";
import ShoppingCart from "../components/ShoppingCart.vue";
import Manga from "../components/Manga.vue";

const routes = [
  { path: "/", component: HomePage, props: true },
  { path: "/user-settings", component: UserSettings, props: true },
  { path: "/wish-list", component: WishList, props: true },
  { path: "/shopping-cart", component: ShoppingCart, props: true },
  { path: "/manga/:id", component: Manga, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
