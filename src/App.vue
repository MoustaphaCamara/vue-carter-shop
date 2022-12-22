<template>
  <nav>
    <div class="nav-container">
      <div id="logo">
        <router-link to="/">
          <img src="src/assets/img/logo.jpg" alt="logo" />
        </router-link>
      </div>
      <ul id="icons">
        <li>
          <router-link to="/infos">
            <i class="fa-solid fa-file-lines"></i>
          </router-link>
        </li>
        <!-- <li>
          <router-link to="/wish-list">
            <i class="fas fa-heart"></i>
            <span id="nav-not"></span>
          </router-link>
        </li> -->
        <!-- <li>
          <router-link to="/shopping-cart">
            <i class="fas fa-shopping-cart"></i>
          </router-link>
        </li> -->
      </ul>
    </div>
  </nav>
  <router-view></router-view>
</template>
