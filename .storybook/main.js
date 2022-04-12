const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  style: [],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  webpackFinal: (config) => {
    config.resolve.modules = [
      path.resolve(__dirname, '..', 'src'),
      path.resolve(__dirname, '..', 'node_modules'),
    ];
    config.plugins.map((plugin) => {
      if (plugin.constructor.name === 'ESLintWebpackPlugin') {
        return new ESLintPlugin({
          failOnError: false,
        });
      }
      return plugin;
    });
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(NODE_ENV !== 'production'),
        __STORYBOOK__: 'true',
        DEBUG: 'true',
      }),
    );
    return config;
  },
};
