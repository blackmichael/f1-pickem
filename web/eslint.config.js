const js = require('@eslint/js');
const react = require('eslint-plugin-react');
const unusedImports = require('eslint-plugin-unused-imports');
const googleConfig = require('eslint-config-google');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  // Apply to all JS/JSX files
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        // ES2021 globals
        Promise: 'readonly',
        Set: 'readonly',
        Map: 'readonly',
        Symbol: 'readonly',
      },
    },
    plugins: {
      react,
      'unused-imports': unusedImports,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...googleConfig.rules,
      ...react.configs.recommended.rules,
      
      // Custom rules
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'require-jsdoc': 'off',
      'max-len': 'off',
      'new-cap': 'off',
      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true,
        },
      ],
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  // Ignore patterns
  {
    ignores: ['build/', 'node_modules/', 'coverage/', 'amplify/'],
  },
];
