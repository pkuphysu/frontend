module.exports = {
  root: true,

  env: {
    node: true
  },

  rules: {
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 4
      }
    ],
    'max-len': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:vue/essential',
    '@vue/standard'
  ]
}
