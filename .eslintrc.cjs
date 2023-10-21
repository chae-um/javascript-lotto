module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:jsdoc/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // 프리코스 요구사항
    'max-depth': ['error', 2],
    'max-lines-per-function': ['error', 15],

    // ESM 사용으로 인한 파일 확장자 표기 의무화
    'import/extensions': ['error', 'always', { ignorePackages: true }],

    'jsdoc/require-param-description': 'off',
    'jsdoc/require-returns-description': 'off',
  },
  overrides: [
    {
      files: ['__tests__/**/*.js'],
      rules: {
        'max-lines-per-function': 'off',
        'no-new': 'off',
        'no-undef': 'off',
        'arrow-body-style': 'off',
      },
    },
  ],
};
