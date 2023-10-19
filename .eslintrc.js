module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb', 'plugin:jsdoc/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // 프리코스 요구사항
    'max-depth': ['error', 2],
    'max-lines-per-function': ['error', 15],

    'jsdoc/require-param-description': 'off',
    'jsdoc/require-returns-description': 'off',
  },
  overrides: [
    {
      files: ['__tests__/**/*.js'],
      rules: {
        'max-lines-per-function': 'off',
        'no-new': 'off',
      },
    },
  ],
};
