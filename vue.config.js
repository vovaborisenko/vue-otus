const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        const [options, ...restOpts] = args;

        options.title = 'FILMS';

        return [options, ...restOpts];
      });
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/assets/styles/variables"; @import "~@/assets/styles/mixins";',
      },
    },
  },
});
