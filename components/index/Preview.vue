<template>
  <div class="preview">
    <div class="preview__content">
      <nuxt-link no-prefetch class="preview__item" to="/calculator">
        <div class="preview__image">
          <img src="" alt="" />
        </div>
        <div class="preview__description">
          <h2>Calculator</h2>
          <h3>calculate damage using a simple calculator with many options</h3>
        </div>
      </nuxt-link>
      <nuxt-link no-prefetch class="preview__item" to="/partybuilder">
        <div class="preview__image">
          <img src="" alt="" />
        </div>
        <div class="preview__description">
          <h2>Party Builder</h2>
          <h3>
            create a party build with weapons, artifacts to find out the damage
            of characters in the party
          </h3>
        </div>
      </nuxt-link>
      <nuxt-link no-prefetch class="preview__item" to="/">
        <div class="preview__image">
          <img src="" alt="" />
        </div>
        <div class="preview__description">
          <h2>More instruments</h2>
          <h3></h3>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/vars.scss";
.preview {
  width: 100%;
  height: $preview;
  background-color: $thirtyColor;
  &__content {
    max-width: 1600px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__item {
    position: relative;
    width: 32%;
    height: 90%;
    background-color: lighten($thirtyColor, 15%);
    &:hover {
      .preview__image img {
        transform: scale(1.2);
      }
      .preview__description {
        background-color: rgba(0, 0, 0, 0.4);
      }
      .preview__description h2 {
        transform: translateY(-40px);
      }
      .preview__description h3 {
        display: block;
        opacity: 1;
      }
    }
  }
  &__image {
    position: relative;
    width: 100%;
    height: 100%;
    display: inline-block;
    overflow: hidden;

    & img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      transition: transform 0.5s ease-in-out;
    }
  }
  &__description {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    transition: background-color 0.4s ease-in-out;

    & h2 {
      font-family: "Josefin Sans", sans-serif;
      font-size: 30px;
      text-decoration: none;
      text-transform: uppercase;
      color: $mainFontColor;
      transition: transform 0.3s ease-in-out;
    }
    & h3 {
      font-size: 18px;
      max-width: 60%;
      height: 0;
      word-wrap: break-word;
      text-decoration: none;
      text-transform: uppercase;
      text-align: center;
      color: $mainFontColor;
      opacity: 0;
      transition: transform 0.4s ease-in-out;
      transition: opacity 0.4s ease-in-out;
    }
  }
}
</style>
