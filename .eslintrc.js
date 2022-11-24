module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'jsx-a11y',
    'simple-import-sort',
    'jest',
    'testing-library',
  ],
  rules: {
    'simple-import-sort/imports': 'warn',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
        disallowTypeAnnotations: false,
      },
    ],
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'no-console': 'off',
    'sort-keys': 'off',
    'sort-imports': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'import/no-named-as-default-member': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'detect',
    },
    jest: {
      version: 28,
    },
  },
}
