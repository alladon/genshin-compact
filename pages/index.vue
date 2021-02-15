<template>
  <div class="content">
    <Prewiew />
    <div class="information">
      <Links />
      <News />
    </div>
  </div>
</template>

<script>
import Prewiew from "~/components/index/Preview";
import Links from "~/components/index/Links.vue";
import News from "~/components/index/News.vue";

export default {
  components: {
    Prewiew,
    Links,
    News
  }
};
</script>

<style lang="scss">
@import "@/assets/css/vars.scss";

.information {
  display: flex;
  justify-content: space-between;
}
</style>
