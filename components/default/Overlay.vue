<template>
  <div
    class="overlay"
    :class="{ active: menu }"
    @click="$emit('menu', !menu)"
  ></div>
</template>

<script>
export default {
  props: ["menu"]
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/vars.scss";

.overlay {
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
  z-index: 99;
  transition: 0.5s ease;
  &.active {
    visibility: visible;
    background-color: #ffffff30;
  }
}
</style>
