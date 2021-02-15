<template>
  <div class="content">
    <client-only>
      <Input @inputStat="getInput" />
      <Output v-bind:input="input" />
    </client-only>
  </div>
</template>

<script>
import Input from "@/components/calculator/Input";
import Output from "@/components/calculator/Output";

export default {
  data: () => {
    return {
      input: null
    };
  },
  components: {
    Input,
    Output
  },
  methods: {
    getInput(input) {
      this.input = input;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/vars.scss";
</style>

<style lang="scss" scoped>
@import "@/assets/css/vars.scss";
.content {
  max-width: 1800px;
  display: flex;
  justify-content: space-between;
  color: $secondaryFontColor;
  max-height: $contentWithoutFooter;
}
</style>
