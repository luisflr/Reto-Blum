module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './.eslinttsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'jest', 'prettier'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:jest/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        'no-param-reassign': 'off',
      },
    },
    {
      files: ['*.ts'],
      rules: {},
    },
  ],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'prettier/prettier': 'error',
    'no-new': 'off',
  },
};
