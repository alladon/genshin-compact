<template>
  <aside :class="{ active: menu }" class="side-menu">
    <nav class="side-menu__navigation">
      <ul class="navigation-list">
        <li class="navigation-list__item">
          <nuxt-link
            exact
            active-class="active"
            class="navigation-list__link"
            to="/"
            :tabindex="tabIndex"
            @click.native="$emit('menu', !menu)"
          >
            <span>Home</span>
          </nuxt-link>
        </li>
        <li class="navigation-list__item">
          <nuxt-link
            active-class="active"
            class="navigation-list__link"
            to="/calculator"
            :tabindex="tabIndex"
            @click.native="$emit('menu', !menu)"
          >
            <span>Calculator</span>
          </nuxt-link>
        </li>
        <li class="navigation-list__item">
          <nuxt-link
            active-class="active"
            class="navigation-list__link"
            to="/characterbuilder"
            :tabindex="tabIndex"
            @click.native="$emit('menu', !menu)"
          >
            <span>Character Builder</span>
          </nuxt-link>
        </li>
        <li class="navigation-list__item">
          <nuxt-link
            active-class="active"
            class="navigation-list__link"
            to="/partybuilder"
            :tabindex="tabIndex"
            @click.native="$emit('menu', !menu)"
          >
            <span>Party Builder</span>
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </aside>
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
.side-menu {
  position: fixed;
  bottom: 0;
  left: -500px;
  width: 300px;
  height: $content;
  z-index: 100;
  background-color: $thirtyColor;
  box-shadow: 3px 0px 10px 1px rgba(0, 0, 0, 0.493);
  transition: 0.5s ease;
  &.active {
    left: 0;
  }
  &__navigation {
    height: 100%;
    width: 100%;
  }

  .navigation-list {
    width: 100%;
    padding-top: 15px;
    &__item {
      height: 60px;
      transition: 0.2s linear;
      font-size: 20px;
    }
    &__link {
      padding-left: 15px;
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: $mainFontColor;
      display: flex;
      align-items: center;
      & span {
        font-size: 16px;
        text-transform: uppercase;
      }
      &:hover {
        background-color: lighten($thirtyColor, 10%);
      }
      &.active {
        background-color: lighten($thirtyColor, 20%);
      }
    }
  }
}
</style>
