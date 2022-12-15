import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import UserSettings from "../components/UserSettings.vue";
import WishList from "../components/WishList.vue";
import ShoppingCart from "../components/ShoppingCart.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/user-settings", component: UserSettings },
  { path: "/wish-list", component: WishList },
  { path: "/shopping-cart", component: ShoppingCart },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
