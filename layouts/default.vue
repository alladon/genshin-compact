<template>
  <div id="app">
    <client-only>
      <Header v-bind:menu="menu" @menu="showMenu" />
    </client-only>
    <Sidemenu v-bind:menu="menu" @menu="showMenu" />
    <Overlay v-bind:menu="menu" @menu="showMenu" />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/default/Header";
import Sidemenu from "@/components/default/Sidedenu";
import Footer from "@/components/default/Footer";

export default {
  components: {
    Header,
    Sidemenu,
    Footer
  },
  data: () => {
    return {
      menu: false
    };
  },
  methods: {
    showMenu(state) {
      this.menu = state;
    }
  }
};
</script>

<style lang="scss"></style>
