<template>
  <h2 @click="displayFavs()">
    Liste de favoris <i class="fas fa-heart"></i><span id="nav-not"></span>
  </h2>

  <div id="parent">
    <div
      class="fav-container"
      id="fav-container"
      v-for="like in liked"
      :key="like"
    >
      <div v-for="product in productList" :key="product.id">
        <div v-if="product.id == like">
          <h3 @click="getManga(product)" class="fav-title" id="fav-title">
            {{ product.title }} -
            <span class="fav-price">{{ product.price }}€</span>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addRedDot from "../js/redDot";

export default {
  name: "WishList",
  props: {
    liked: Array,
    productList: Array,
    getManga: Function,
  },
  methods: {
    displayFavs() {
      let favs = document.getElementById("parent");
      favs.classList.toggle("displayed");
    },
  },
  mounted() {
    addRedDot();
    // bug à check : quand je reload la page, même quitter navigateur éteindre pc et revenir, le red dot fonctionne et cookies sont là. Mais quand je change de component, red dot disparait et ne revient pas qd je reviens sur homepage, faut refresh page..
  },
};
</script>
<style scoped>
.fav-container {
  color: orangered;
  transition: 0.2s ease;
}
#parent {
  position: absolute;
  z-index: 1;
  background: rgba(0, 0, 0, 0.8);
  display: none;
  transition: 0.5s ease;
  transform: translate(200px, -45px);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid gray;
}
.displayed {
  animation: display 1s ease forwards;
  display: block !important;
}
@keyframes display {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translate(225px, -30px);
  }
}
h2 {
  display: inline;
}
h2:hover,
h3:hover {
  cursor: pointer;
}
</style>
