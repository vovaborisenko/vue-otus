<template>
  <button
    type="button"
    :disabled="disabled"
    class="btn"
    :class="classNames"
  >
    <slot />
  </button>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const classNames = computed(() => ({
  'btn--active': props.active,
}));
</script>

<style lang="scss">
.btn {
  padding: 5px 20px;
  border-radius: 25px;
  border: 2px solid $color-text;
  font-size: 24px;
  letter-spacing: 2px;
  color: $color-text;
  background-color: $color-text-inverse;
  cursor: pointer;

  &:hover {
    border-color: $color-accent;
    transition: .2s;
  }

  &--active, &:active {
    border-color: $color-accent;
    background-color: $color-accent;
    color: $color-text-inverse;
    transition: .2s;
  }

  &:disabled {
    opacity: 0.7;
    pointer-events: none;
  }
}
</style>
