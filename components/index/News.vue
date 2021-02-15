<template>
  <div class="news">
    <div class="news__content">
      <h1 class="news__title">Last News</h1>
      <div class="news__item" v-for="(item, idx) in news" :key="idx">
        <div class="item__title">
          {{ item.title }}
        </div>
        <div class="item__content">
          {{ item.content }}
        </div>
        <div class="item__date">
          {{ item.date }}
        </div>
      </div>
      <nuxt-link no-prefetch class="news__more" to="/">More News</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    news() {
      let store = this.$store.state.news.news;
      let news = [];
      for (let i = 1; i > 0; i--) {
        news.push(store[store.length - i]);
      }
      return news;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/vars.scss";

.news {
  top: $preview;
  height: calc(#{$content} - #{$preview} - #{$footer});
  width: 50%;
  background-color: darken($thirtyColor, 2%);

  &__content {
    position: relative;
    overflow: hidden;
    max-width: 800px;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $secondaryFontColor;
  }

  &__title {
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  &__more {
    text-transform: uppercase;
    text-decoration: none;
    font-weight: 700;
    color: inherit;
    margin-top: 20px;
    padding: 15px;
    cursor: pointer;
    border: 1px solid $secondaryFontColor;
    transition: color background-color 0.2s linear;

    &:hover {
      color: darken($thirtyColor, 5%);
      background-color: $secondaryFontColor;
    }
  }

  &__item {
    width: 100%;
    border: 1px solid $secondaryFontColor;
    margin-bottom: 10px;
    padding: 20px;

    .item__title {
      font-family: "Josefin Sans", sans-serif;
      font-size: 24px;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .item__content {
      word-wrap: break-word;
      margin-bottom: 5px;
    }
    .item__date {
      text-align: right;
    }
  }
}
</style>
