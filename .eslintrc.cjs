/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    // "@vue/eslint-config-typescript/recommended",
    // "@vue/eslint-config-prettier",
    '@vue/eslint-config-airbnb-with-typescript',
  ],
  overrides: [
    {
      files: [
        'cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}',
      ],
      extends: [
        'plugin:cypress/recommended',
      ],
    },
  ],
  rules: {
    'no-console': 'off',
  },
};
