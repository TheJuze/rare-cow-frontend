const path = require('path');
module.exports = {
  framework: '@storybook/react',
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
  ],
  core: {
    builder: 'storybook-builder-vite',
  },
  features: {
    storyStoreV7: false,
  },
  async viteFinal(config, { configType }) {
    return {
      ...config,
      resolve: {
        alias: [
          {
            find: 'appConstants',
            replacement: path.resolve(__dirname, '../src/appConstants'),
          },
          {
            find: 'assets',
            replacement: path.resolve(__dirname, '../src/assets'),
          },
          {
            find: 'components',
            replacement: path.resolve(__dirname, '../src/components'),
          },
          {
            find: 'config',
            replacement: path.resolve(__dirname, '../src/congig'),
          },
          {
            find: 'containers',
            replacement: path.resolve(__dirname, '../src/containers'),
          },
          {
            find: 'hooks',
            replacement: path.resolve(__dirname, '../src/hooks'),
          },
          {
            find: 'pages',
            replacement: path.resolve(__dirname, '../src/pages'),
          },
          {
            find: 'services',
            replacement: path.resolve(__dirname, '../src/services'),
          },
          {
            find: 'store',
            replacement: path.resolve(__dirname, '../src/store'),
          },
          {
            find: 'styles',
            replacement: path.resolve(__dirname, '../src/styles'),
          },
          {
            find: 'types',
            replacement: path.resolve(__dirname, '../src/types'),
          },
          {
            find: 'utils',
            replacement: path.resolve(__dirname, '../src/utils'),
          },
        ],
      },
    };
  },
};
