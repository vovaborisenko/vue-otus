import http from './httpClient';

const END_POINT = '/v2.2/films';

function transformFilmsToItems(data) {
  return Array.isArray(data.films)
    ? {
      ...data,
      items: data.films.map((item) => ({
        ...item,
        kinopoiskId: item.filmId,
      })),
    }
    : data;
}

function normalizeFilters(data) {
  return Object.entries(data).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: Array.isArray(value)
      ? value.map((item) => ({ ...item, label: Object.values(item)[1] }))
      : value,
  }), {});
}

export const TOP_250_BEST_FILMS = 'TOP_250_BEST_FILMS';
export const TOP_100_POPULAR_FILMS = 'TOP_100_POPULAR_FILMS';
export const TOP_AWAIT_FILMS = 'TOP_AWAIT_FILMS';
export const TOPS = {
  [TOP_250_BEST_FILMS]: { label: 'Лучшие', value: TOP_250_BEST_FILMS },
  [TOP_100_POPULAR_FILMS]: { label: 'Популярные', value: TOP_100_POPULAR_FILMS },
  [TOP_AWAIT_FILMS]: { label: 'Ожидаемые', value: TOP_AWAIT_FILMS },
};

function getFilters() {
  return http.get(`${END_POINT}/filters`, {
    transformResponse: [
      ...http.defaults.transformResponse,
      normalizeFilters,
    ],
  });
}

function getList(params, topTypeList, abortedController) {
  if (topTypeList) {
    return http.get(`${END_POINT}/top`, {
      params: { type: topTypeList },
      transformResponse: [
        ...http.defaults.transformResponse,
        transformFilmsToItems,
      ],
      signal: abortedController?.signal,
    });
  }

  return http.get(END_POINT, {
    params,
    signal: abortedController?.signal,
  });
}

function getListByKeyword({ keyword = '', page = 1 }) {
  return http.get(`${END_POINT}/search-by-keyword`, {
    params: {
      keyword,
      page,
    },
  });
}

function getItem(id) {
  return http.get(`${END_POINT}/${id}`);
}

function getSimilarItems(id) {
  return http.get(`${END_POINT}/${id}/similars`);
}

export default {
  TOPS,
  getFilters,
  getList,
  getListByKeyword,
  getItem,
  getSimilarItems,
};
