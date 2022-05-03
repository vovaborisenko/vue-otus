<template>
  <label
    :aria-label="placeholder"
    class="field"
  >
    <span class="field__input-wrapper">
      <input
        :value="modelValue"
        type="text"
        :placeholder="placeholder"
        class="field__input"
        @input="$emit('update:model-value', $event.target.value)"
      >
      <LoaderEllipsis
        v-if="loading"
        class="field__loader"
      />
    </span>
    <span
      class="field__hint"
      v-text="hint"
    />
  </label>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';
import LoaderEllipsis from '@/components/LoaderEllipsis.vue';

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '&nbsp;',
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:model-value']);
</script>

<style lang="scss">
.field {
  display: flex;
  flex-direction: column;

  &__input {
    width: 100%;
    padding: 5px 20px;
    border-radius: 25px;
    border: 2px solid $color-text;
    font-size: 24px;
    color: inherit;
    background: $color-text-inverse;
    box-shadow: none;

    &:focus {
      outline: 1px solid $color-accent;
      outline-offset: unset;
      border-color: $color-accent;
      transition: .2s;
    }
  }

  &__input-wrapper {
    position: relative;
  }

  &__loader {
    position: absolute;
    top: 50%;
    right: 0;
    color: $color-accent;
    transform: translateY(-50%);
  }

  &__hint {
    margin-top: 5px;
    padding-left: 10px;
    color: rgba($color-text, .7);
  }
}
</style>
