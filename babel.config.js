module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
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
          '@common': './src/common',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@layouts': './src/layouts',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@services': './src/services',
          '@typings': './src/typings',
          '@designs': './src/designs',
          '@icons': './src/icons',
          '@navigator': './src/navigator',
          '@fragments': './src/fragments',
          '@apiCaller': './src/apiCaller.ts',
          '@themes': './src/themes',
        },
      },
    ],
  ],
};
