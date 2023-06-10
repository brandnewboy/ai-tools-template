const prettierConf = require('./.prettierrc.js')

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint-config-prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    /**
     * 1.继承.prettierrc.js文件规则
     * 2.开启rules的 "prettier/prettier": "error"
     * 3.eslint fix的同时执行prettier格式化
     */
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '.*', args: 'none' }
    ], //变量声明未使用
    '@typescript-eslint/no-explicit-any': 'off', // 允许ts使用any
    'prettier/prettier': ['error', prettierConf]
  }
}
