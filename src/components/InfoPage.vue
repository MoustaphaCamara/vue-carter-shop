<template>
  <h1>Informations sur cette application</h1>
  <div class="info-container">
    <div class="info">
      <div class="content">
        <h3>Technologies utilisées</h3>
        <p>VueJs, Vite</p>
      </div>
    </div>
    <div class="info">
      <div class="content">
        <h3>Modules importés</h3>
        <p>axios, vue-router</p>
        <p>cdn fontawesome</p>
      </div>
    </div>
    <div class="info">
      <div class="content">
        <h3>Base de données</h3>
        <p>Créée en json, inspirée des pages de nautiljon.com</p>
        <p>Prix fictifs, images tirées des wikipedias respectifs</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "InfoPage",
};
</script>
<style>
.info-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.info {
  transition: 0.5s ease;
  box-shadow: inset 0 0 15px black;
  text-align: center;
  flex: 1 0 28%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  max-width: 300px;
  height: 150px;
  border-radius: 16px;
  /* clip-path: inset(0 0 1px 0 round 16px); */
  margin: 16px;
  background-color: #809dac;
  background-image: linear-gradient(135deg, #809dac 0%, #090f47 100%);
}
/* .info:hover {
  box-shadow: inset 0 0 30px black;
  transform: translateY(-5px);
} */
h3 {
  margin-bottom: 8px;
}
</style>
