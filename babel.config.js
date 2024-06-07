module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@assets': './src/assets',
          '@images': './src/assets/images',
          '@icons': './src/assets/icons',

          '@axios': './src/config/axios',
          '@config': './src/config',

          '@hooks': './src/hooks',
          '@routes': './src/routes',

          '@screens': './src/screens',
          '@layouts': './src/layouts',
          '@components': './src/components',

          '@redux': './src/redux',
          '@services': './src/services',

          '@interface': './src/interface',
        },
      },
    ],
  ],
};
