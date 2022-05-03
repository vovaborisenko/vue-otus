<template>
  <header class="header">
    <a
      href="/"
      aria-label="Logo"
      class="header__logo"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 80 50"
      ><rect
        width="5.7"
        height="50"
        fill="currentColor"
      /><polygon
        points="80 0 49.45 0 49.45 11.5 23.47 11.5 23.47 21.5 45.66 21.5 45.66 33.06 23.47 33.06
         23.47 50 80 50 80 0"
        fill="currentColor"
      /></svg>
    </a>
  </header>
</template>

<style lang="scss">
.header {
  display: flex;
  padding: 15px;

  &__logo {
    width: 80px;
    height: 50px;
    color: $color-accent;
  }
}
</style>
