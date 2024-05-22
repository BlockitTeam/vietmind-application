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
          '@themes': './src/themes',

          '@common': './src/common',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@layouts': './src/layouts',
          '@redux': './src/redux',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@services': './src/services',
          '@typings': './src/typings',
          '@designs': './src/designs',
          '@navigator': './src/navigator',
          '@fragments': './src/fragments',
          '@apiCaller': './src/apiCaller.ts',
        },
      },
    ],
  ],
};
