<template>
  <div
    class="app__header"
    :class="{'app__header--full-page': items === null || items.length === 0}"
  >
    <TheHeader />
    <BaseHero class="app__header-hero">
      <FiltersForm
        v-model="filtersValue"
        :filters="filters"
        :types="filmApi.TOPS"
        :search-hint="searchHint"
        :loading="isLoading"
        @update:model-value="debounceSearchByFilters"
      />
    </BaseHero>
  </div>
  <div v-if="currentItemId">
    <button
      type="button"
      class="btn"
      @click="currentItemId = null"
    >
      Back
    </button>
    <img
      :src="currentItem.coverUrl || currentItem.posterUrl || currentItem.posterUrlPreview"
      :alt="currentItem.nameOriginal"
      style="max-width: 100%"
    >
    <h2>{{ currentItem.nameRu || currentItem.nameEn || currentItem.nameOriginal }}</h2>
    <p>{{ currentItem.description }}</p>
  </div>
  <div
    v-else
    class="grid"
  >
    <FilmPreview
      v-for="item in items"
      :key="item.kinopoiskId"
      :src="item.posterUrlPreview"
      :title="item.nameRu || item.nameEn || item.nameOriginal"
      :genres="item.genres"
      class="grid__item"
      @click="getItemDetails(item.kinopoiskId)"
    />
  </div>
  <TheFooter class="app__footer" />
</template>

<script setup>
import {
  reactive, ref, computed, onMounted,
} from 'vue';
import { useToast } from 'vue-toastification';

import BaseHero from '@/components/BaseHero.vue';
import FilmPreview from '@/components/FilmPreview.vue';
import FiltersForm from '@/components/FiltersForm.vue';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

import filmApi, { TOP_250_BEST_FILMS } from '@/api/films.api';
import debounce from '@/utils/debounce';

const toast = useToast();
const items = ref(null);
const filters = ref({ filter: [] });
const filtersValue = ref({
  search: '',
  filters: {},
  type: TOP_250_BEST_FILMS,
});
const fullItems = reactive({});
const currentItemId = ref(null);
const isLoading = ref(false);

const searchHint = computed(() => (Array.isArray(items.value) && items.value.length === 0 ? 'Поиск не дал результата. Попробуйте другой поисковой запрос' : ''));

const currentItem = computed(() => fullItems[currentItemId.value]);

const requestFilters = computed(() => {
  let params = {};

  if (filtersValue.value.search) params.keyword = filtersValue.value.search;

  if (Object.keys(filtersValue.value.filters).length !== 0) {
    const filtersForParams = Object.entries(filtersValue.value.filters)
      .reduce((acc, [key, value]) => (value ? { ...acc, [key]: value.id } : acc), {});

    params = { ...params, ...filtersForParams };
  }

  return params;
});

let controllerGetItems = null;
function getItems() {
  if (controllerGetItems) controllerGetItems.abort();

  controllerGetItems = new AbortController();
  isLoading.value = true;

  return filmApi.getList(requestFilters.value, filtersValue.value.type, controllerGetItems)
    .then(({ data }) => {
      items.value = data.items;
      isLoading.value = false;
    })
    .catch((err) => {
      if (err.message !== 'canceled') {
        toast.error(err.message);
        isLoading.value = false;
      }
    });
}

const debounceSearchByFilters = debounce(getItems);

function getItemDetails(id) {
  if (fullItems[id]) {
    currentItemId.value = id;
    return;
  }

  filmApi.getItem(id)
    .then(({ data }) => {
      fullItems[id] = data;
      currentItemId.value = id;
    }).catch(() => {});
}

onMounted(() => {
  getItems();
  filmApi.getFilters().then(({ data }) => {
    filters.value = data;
  }).catch(() => {});
});
</script>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__header {
    display: flex;
    flex-direction: column;
    min-height: max(310px, 50vh);
    transition: 1s;
  }

  &__header--full-page {
    min-height: 100vh;
  }

  &__header-hero {
    margin: auto;
  }

  &__footer {
    margin-top: auto;
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;

  @include respond(tablet) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @include respond(laptop) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  &__item {
    @include respond(tablet) {
      &:nth-child(6n - 5), &:nth-child(6n - 1) {
        grid-column-start: span 2;
        grid-row-start: span 2;
      }
    }

    @include respond(laptop) {
      &:nth-child(6n - 5), &:nth-child(6n - 1) {
        grid-column-start: span 1;
        grid-row-start: span 1;
      }

      &:nth-child(10n - 9), &:nth-child(10n - 2) {
        grid-column-start: span 2;
        grid-row-start: span 2;
      }
    }
  }
}
</style>
