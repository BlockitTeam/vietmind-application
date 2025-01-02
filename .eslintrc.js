module.exports = {
    parser: '@typescript-eslint/parser', // Use TypeScript parser
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['@typescript-eslint'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }, // Ignore vars starting with _
      ],
    },
  };