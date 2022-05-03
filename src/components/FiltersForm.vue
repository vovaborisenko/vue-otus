<template>
  <div class="filter-form">
    <TextInput
      :model-value="modelValue.search"
      :placeholder="searchPlaceholder"
      :hint="searchHint"
      :loading="loading"
      class="filter-form__item"
      @update:model-value="$emit('update:model-value', {...modelValue, search: $event, type: ''})"
    />
    <div
      v-if="isFiltersEmpty"
      class="grid-types filter-form__item"
    >
      <BaseButton
        v-for="item in types"
        :key="item.value"
        :active="modelValue.type === item.value"
        class="grid-types__item"
        @click="$emit('update:model-value', {
          ...modelValue,
          type: modelValue.type !== item.value ? item.value : ''
        })"
      >
        {{ item.label }}
      </BaseButton>
    </div>
    <div class="grid-filters filter-form__item">
      <VueMultiselect
        v-for="(options, key) in filters"
        :key="key"
        :model-value="modelValue.filters[key]"
        :options="options"
        :disabled="!options.length"
        :loading="loading"
        track-by="id"
        class="grid-filters__item"
        @update:model-value="$emit('update:model-value', {
          ...modelValue,
          filters: {...modelValue.filters, [key]: $event},
          type: ''
        })"
      >
        <template #option="{option}">
          {{ option.label.capitalize() || `id: ${option.id}` }}
        </template>
        <template #singleLabel="{option}">
          {{ option.label.capitalize() || `id: ${option.id}` }}
        </template>
      </VueMultiselect>
      <BaseButton
        v-if="!isFiltersEmpty"
        class="grid-filters__item grid-filters__item--wide"
        @click="onReset"
      >
        reset
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits, defineProps } from 'vue';

import VueMultiselect from 'vue-multiselect';
import TextInput from '@/components/TextInput.vue';
import BaseButton from '@/components/BaseButton.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ search: '', filters: {}, type: '' }),
  },
  searchPlaceholder: {
    type: String,
    default: 'Поиск',
  },
  searchHint: {
    type: String,
    default: '',
  },
  filters: {
    type: Object,
    default: () => ({}),
  },
  types: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const defaultValue = { ...props.modelValue };

const isFiltersEmpty = computed(() => {
  const { search, filters } = props.modelValue;

  return !search && Object.values(filters).filter(Boolean).length === 0;
});

const emit = defineEmits(['update:model-value']);

function onReset() {
  emit('update:model-value', { ...defaultValue });
}
</script>

<style lang="scss">
.filter-form {
  &__item + &__item {
    margin-top: 16px;
  }
}

.grid-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  &__item {
    flex: 1 1 350px;
  }
}

.grid-types {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  &__item {
    flex: 1 1 150px;
  }
}
</style>
