<template>
  <div class="links">
    <div class="links__content">
      <!---->
      <div class="links__container">
        <h1 class="links__title">My Links</h1>
        <div class="links__array">
          <a
            href="https://telegram.org"
            target="_blank"
            class="links__item links__item--telegram"
          >
            <i class="fab fa-telegram-plane"></i>
            <span>Telegram</span>
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            class="links__item links__item--discord"
          >
            <i class="fab fa-discord"></i>
            <span>Discord</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            class="links__item links__item--twitter"
          >
            <i class="fab fa-twitter"></i>
            <span>Twitter</span>
          </a>
        </div>
        <a href="#" target="_blank" class="links__item links__item--wide">
          <i class="fab fa-telegram-plane"></i>
          <span>Bug report</span>
        </a>
      </div>

      <!---->
      <div class="links__container">
        <h1 class="links__title">Genshin Impact Official Links</h1>
        <div class="links__array">
          <a
            href="https://telegram.org"
            target="_blank"
            class="links__item links__item--youtube"
          >
            <i class="fab fa-youtube"></i>
            <span>Youtube</span>
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            class="links__item links__item--discord"
          >
            <i class="fab fa-discord"></i>
            <span>Discord</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            class="links__item links__item--twitter"
          >
            <i class="fab fa-twitter"></i>
            <span>Twitter</span>
          </a>
        </div>
        <a href="#" target="_blank" class="links__item links__item--wide">
          <i class="fas fa-globe"></i>
          <span>Official website</span>
        </a>
      </div>
      <!---->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/vars.scss";

.links {
  top: $preview;
  height: calc(#{$content} - #{$preview} - #{$footer});
  left: 50%;
  width: 50%;
  background-color: lighten($thirtyColor, 2%);

  &__content {
    position: relative;
    width: 100%;
    height: 100%;
    color: $secondaryFontColor;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__container {
    height: 40%;
    max-width: 800px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  &__array {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  &__title {
    font-size: 38px;
    margin-bottom: 10px;
  }

  &__item {
    position: relative;
    width: 200px;
    height: 50px;
    margin: 0 15px;
    margin-bottom: 20px;
    padding: 10px 30px;
    border: 1px solid $secondaryFontColor;
    color: $secondaryFontColor;
    text-decoration: none;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s linear;

    & i {
      font-size: 24px;
    }
    & span {
      margin-left: 15px;
    }

    &:hover {
      color: lighten($thirtyColor, 2%);
      background-color: $secondaryFontColor;
    }
    &--telegram:hover {
      background-color: #0088cc;
      border: 1px solid #0088cc;
    }
    &--discord:hover {
      background-color: #7289da;
      border: 1px solid #7289da;
    }
    &--twitter:hover {
      background-color: #1da1f2;
      border: 1px solid #1da1f2;
    }
    &--youtube:hover {
      background-color: #ff0000;
      border: 1px solid #ff0000;
    }
    &--wide {
      width: 660px;
    }
  }
}
</style>
