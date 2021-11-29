// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  extends: [
    '@viclafouch/eslint-config-viclafouch/typescript',
    'plugin:jest/recommended',
    'plugin:jest-formatting/recommended'
  ],
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    'no-console': 'error',
    'import/no-cycle': 0,
    '@typescript-eslint/ban-ts-comment': 'off'
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['error']
      }
    }
  ]
}
