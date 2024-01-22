module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-rational-order',
    'stylelint-config-recommended-vue/scss',
  ],
  plugins: ["stylelint-order", "stylelint-scss"],
  rules: {
    // 'at-rule-no-unknown': [true],
    'function-no-unknown': [true, {
      'ignoreFunctions': ['/v-bind/']
    }],
    'custom-property-empty-line-before': null,
    'selector-class-pattern': null,
    'value-keyword-case': null,
    'no-empty-source': null,
  },
};
