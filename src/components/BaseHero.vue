<template>
  <div class="hero">
    <h1
      v-animate-title="['films', 'serials', 'tv-shows']"
      class="hero__title"
      v-text="'films'"
    />
    <div class="hero__subtitle">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;

  &__title {
    display: flex;
    margin: 0;
    font-size: min(19vw, 130px);
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    color: $color-text;
  }

  &__subtitle {
    min-width: 75vw;
  }
}
</style>
