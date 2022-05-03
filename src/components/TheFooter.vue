<template>
  <footer class="footer">
    <p class="footer__text">
      © Copyright {{ (new Date()).getFullYear() }}
    </p>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
};
</script>

<style lang="scss">
.footer {
  padding: 30px 0;
  text-align: center;
  background: #f5f5f5;

  &__text {
    margin: 0;
    padding: 0 15px;
    color: #ccc;
  }
}
</style>
