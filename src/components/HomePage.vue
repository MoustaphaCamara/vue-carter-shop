<template>
  <div class="home-container">
    <h1>MangaList</h1>
    <!-- search display -->
    <p class="notice">Desktop version only</p>

    <input
      v-model="searchKey"
      type="search"
      id="search"
      placeholder="Effectuez une recherche..."
      autocomplete="off"
    />
    <WishList :liked="liked" :productList="productList" :getManga="getManga" />
    <br />
    <span v-if="searchKey && filteredList.length >= 1">
      {{ filteredList.length }} résultat<span v-if="filteredList.length >= 2"
        >s</span
      >
    </span>
    <p class="notice">Clique sur un manga pour avoir plus d'infos</p>
    <!-- card display -->
    <div class="card-cart-container">
      <div class="card-container">
        <div
          v-for="product in productList ? filteredList : productList"
          class="card"
          :key="product.id"
        >
          <!-- image -->
          <!-- getManga -> j'appelle router link en fonction $this.router.push et je peux passer mes paramètres -->
          <div class="img-container" @click="getManga(product)">
            <img v-bind:src="product.img" :alt="product.title" />
          </div>
          <!-- texte -->
          <div class="card-text">
            <h3>{{ product.title }}</h3>
            <span>{{ product.price }}€ </span>
          </div>
          <!-- buttons -->
          <div class="card-icons">
            <div class="like-container">
              <input
                type="checkbox"
                name="checkbox"
                v-bind:id="product.id"
                :value="product.id"
                v-model="liked"
              /><label v-bind:for="product.id">
                <i class="fas fa-heart"></i>
              </label>
            </div>
            <div class="add-to-cart">
              <button
                @click="addToCart(product), cartTotalAmount(), cartTotalItems()"
              >
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- no result message -->
        <div v-if="searchKey && filteredList.length < 1">
          Aucun résultat pour cette recherche...
        </div>
      </div>
      <!-- cart display -->
      <transition name="cart-anim">
        <div v-if="cart.length > 0" class="shopping-cart" id="shopping-cart">
          <h2>Panier</h2>
          <transition-group name="item-anim" tag="div" class="item-group">
            <!-- each product in cart -->
            <div v-for="product in cart" :key="product.id" class="item">
              <div class="img-container">
                <img :src="product.img" :alt="product.title" />
              </div>
              <div class="item-title">
                <h4>{{ product.title }}</h4>
                <p>{{ product.price }}€</p>
              </div>
              <div class="item-quantity">
                <h6>quantité : {{ product.quantity }}</h6>
                <!-- cart icons -->
                <div class="cart-icons">
                  <button @click="addQuantity(product)">
                    <i class="fa fa-plus"></i>
                  </button>
                  <button @click="reduce(product)">
                    <i class="fa fa-minus"></i>
                  </button>
                  <button @click="remove(product)">
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
                <!-- end of cart icons -->
              </div>
            </div>
            <!-- end of each product -->
          </transition-group>
          <!-- total -->
          <div class="grand-total">
            <div class="total">
              <h2>Total</h2>
              <h2>{{ totalAmount.toFixed(2) }} €</h2>
            </div>
            <h6>Total articles : {{ totalItems }}</h6>
          </div>
          <!-- end of total -->
        </div>
        <!-- end of cart display -->
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import WishList from "./WishList.vue";

export default {
  components: { WishList },
  name: "HomePage",
  props: {
    liked: Array,
    productList: Array,
  },
  data() {
    return {
      productList: null,
      searchKey: "",
      liked: [],
      cart: [],
      totalAmount: 0,
      totalItems: 0,
    };
  },
  computed: {
    filteredList() {
      return this.productList.filter((product) => {
        return product.title
          .toLowerCase()
          .includes(this.searchKey.toLowerCase());
      });
    },
  },
  methods: {
    cartTotalAmount() {
      this.totalAmount = 0;
      for (let item in this.cart) {
        this.totalAmount =
          this.totalAmount + this.cart[item].quantity * this.cart[item].price;
      }
      return this.totalAmount;
      this.cartTotalItems();
    },
    cartTotalItems() {
      this.totalItems = 0;
      for (let item in this.cart) {
        this.totalItems = this.totalItems + this.cart[item].quantity;
      }
      return this.totalItems;
      this.cartTotalAmount();
    },
    // push to Manga component with its id and description
    getManga(product) {
      this.$router.push({
        path: "/manga/" + product.id,
        query: {
          mangaTitle: product.title,
          description: product.description,
          img: product.img,
        },
      });
    },
    // fetch mangas
    fetchProducts() {
      const url = "https://moustaphacamara.fr/json/index.php";
      axios
        .get(url, {
          headers: {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => (this.productList = res.data.products));
      //if in local :
      // axios.get("../js/products.json").then((res) => (this.productList = res.data.products));
    },
    // add a new manga to cart
    addToCart(product) {
      // check if already in cart
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === product.id) {
          return this.cart[i].quantity++;
        }
      }
      this.cart.push({
        id: product.id,
        img: product.img,
        title: product.title,
        price: product.price,
        quantity: 1,
      });
    },
    // quantity actions (+,-,delete)
    addQuantity(product) {
      product.quantity = product.quantity + 1;
      this.cartTotalAmount();
      this.cartTotalItems();
    },
    reduce(product) {
      if (product.quantity < 2) {
        this.remove(product);
      } else {
        product.quantity = product.quantity - 1;
      }
      this.cartTotalAmount();
      this.cartTotalItems();
    },
    remove(product) {
      if (confirm("Supprimer cet article?")) {
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id == product.id) {
            const productIndex = this.cart.indexOf(this.cart[i]);
            // récupérer l'index du cart[i] qui est égal à product id, pour le splice
            this.cart.splice(productIndex, 1);
          }
        }
      }
      this.cartTotalAmount();
      this.cartTotalItems();
    },
  },
  mounted() {
    this.fetchProducts();
    if (localStorage.liked) {
      this.liked = localStorage.liked.split("," ? "," : "");
      // il a fallu passer un array splité pcq sinon ça me retourne true/False et tous les liked sont cochés
      // liked est bindé => c'est la value (product.id) qui est concaténée(,)
    }
  },
  watch: {
    liked(newItem) {
      localStorage.liked = newItem;
    },
    // ici liked(newItem) liked est la value qu'on watch, on change (qui est v-bind)
  },
};
</script>
