module.exports = function (api){
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@theme': './src/theme',
            '@screens': './src/screens',
            '@utils': './src/utils',
            '@storage': './src/storage',
          },
        },
      ],
    ],
  }
};