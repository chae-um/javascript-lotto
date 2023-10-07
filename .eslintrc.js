module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'consistent-return': ['off'],
    // 들여쓰기 깊이 제한
    'max-depth': ['error', 2],
    // 함수의 길이 제한
    'max-lines-per-function': ['error', { max: 15 }],
  },
};
