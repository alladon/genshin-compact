<template>
  <header class="header">
    <div class="header__content">
      <div
        @click="$emit('menu', !menu)"
        :class="{ active: menu }"
        class="header__burger"
      >
        <span></span>
      </div>
      <nuxt-link no-prefetch class="header__logo" :tabindex="tabIndex" to="/">
        Genshin
        <span>compact</span>
      </nuxt-link>
    </div>
  </header>
</template>

<script>
export default {
  props: ["menu"],
  computed: {
    tabIndex() {
      return this.menu ? "0" : "-1";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/vars.scss";
.header {
  position: fixed;
  display: fixed;
  right: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: $header;
  background-color: $secondaryColor;
  z-index: 101;
  box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.493);

  &__content {
    display: flex;
    align-items: center;
    height: 100%;
  }

  &__logo {
    font-family: "Josefin Sans", sans-serif;
    font-size: 36px;
    font-weight: 700;
    width: 300px;
    color: $mainFontColor;
    text-decoration: none;
    cursor: pointer;
    & span {
      height: inherit;
      transition: 0.1s linear;
    }
    &:hover {
      & span {
        font-size: 16px;
      }
    }
  }

  &__burger {
    width: 30px;
    height: 30px;
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.active {
      & span {
        transform: rotate(405deg);
        &:before {
          transform: rotate(450deg);
        }
        &:after {
          transform: rotate(450deg);
        }
      }
    }

    & span {
      box-sizing: content-box;
      $translate: 7px;

      background-color: $mainFontColor;

      height: 3px;
      width: 30px;

      transition: 0.5s ease-in-out;

      &:after {
        content: "";
        display: block;
        position: absolute;
        height: 3px;
        width: 30px;
        transform: translateY(-#{$translate});
        background-color: $mainFontColor;
        transition: 0.5s ease-in-out;
      }
      &:before {
        content: "";
        display: block;
        position: absolute;
        height: 3px;
        width: 30px;
        transform: translateY($translate);
        background-color: $mainFontColor;
        transition: 0.5s ease-in-out;
      }
    }
  }
}
</style>
