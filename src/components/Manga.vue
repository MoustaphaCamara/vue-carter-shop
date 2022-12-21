<template>
  <div class="manga-container">
    <img class="manga-cover" :src="'../' + this.img" :alt="this.mangaTitle" />
    <div class="manga-description">
      <h2>{{ title }}</h2>
      <h3>Synopsis :</h3>
      <p>
        {{ description }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Manga",
  data() {
    return {
      title: this.$route.query.mangaTitle,
      description: this.$route.query.description,
      img: this.$route.query.img,
    };
  },
};
</script>
<style scoped>
h2 {
  color: cyan;
}
.manga-container {
  margin: 0 auto;
  max-width: 1250px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding: 20px;
  gap: 20px;
}
.manga-cover {
  width: 100%;
  max-width: 300px;
  height: 100%;
  max-height: 429px;
}
.manga-description {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.manga-description p {
  line-height: 2rem;
}
@media screen and (max-width: 700px) {
  .manga-container {
    display: block;
    text-align: center;
  }
}
</style>
