<template>
  <div
    class="film-preview "
    :class="{'film-preview--loading': loading}"
  >
    <img
      :src="src"
      :alt="title"
      class="film-preview__img"
    >
    <div class="film-preview__info">
      <div class="film-preview__title">
        {{ title }}
      </div>
      <div class="film-preview__subtitle">
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import placeholder from '@/assets/images/logo.png';

const props = defineProps({
  src: {
    type: String,
    default: placeholder,
  },
  title: {
    type: String,
    default: '',
  },
  genres: {
    type: Array,
    default: () => ([]),
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const subtitle = computed(() => props.genres.map(({ genre }) => genre).join(' / '));
</script>

<style lang="scss">
.film-preview {
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  text-align: center;
  background: no-repeat url('~@/assets/images/placeholder.png') center / contain;
  cursor: pointer;

  &__img {
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    min-height: 100%;
    transform: translate(-50%, 0);
    transition: .2s;
  }

  &:hover &__img {
    transform: translate(-50%, 0) scale(1.1);
  }

  &__info {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    width: 100%;
    padding: 10px;
    transform: translate(-150%, -50%);
    opacity: 0;
  }

  &:hover &__info {
    transform: translate(-50%, -50%);
    opacity: 1;
    transition: .4s;
  }

  &__title {
    font-size: 18px;
    color: $color-text-inverse;
  }

  &__subtitle {
    display: inline-block;
    margin-top: 10px;
    padding: 5px 20px;
    border-radius: 25px;
    text-transform: capitalize;
    font-size: 10px;
    letter-spacing: 2px;
    color: #333;
    background-color: #ffbf00;
    transform: translateX(-50%);
  }

  &:hover &__subtitle {
    transform: translateX(0);
    transition: .6s;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0);
    opacity: 0;
    transition: opacity 2s;
  }

  &:hover::after {
    opacity: 0.7;
    transition: .2s;
  }

  &--loading {
    cursor: wait;
    pointer-events: none;
  }
}
</style>
