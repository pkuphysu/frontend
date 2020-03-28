/**
 * Prettier is evil and unreliable, at least for vue.
 * Do not enable prettier plugin for eslint,
 * there will be some annoying, ugly conflicts.
 * Only use prettier in editor in selection
 * and then eslint the error introduced
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended'],
  rules: {
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 4
      }
    ],
    'vue/script-indent': 'warn',
    'space-infix-ops': 'warn',
    'max-len': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
