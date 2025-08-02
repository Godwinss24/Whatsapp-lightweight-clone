// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  ignores: ['eslint.config.mjs', 'nuxt.config.ts'],
  rules: {
    'indent': ['error', 'tab'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'vue/html-self-closing': 'off',
    'no-return-await': 'error',
    'object-curly-newline': ['error', { multiline: true, consistent: true }],
    'object-curly-spacing': ['error', 'always'],
    'func-style': ['error', 'expression'],
    'no-console': ['error'],
    'no-inline-comments': 'error',
    'multiline-comment-style': ['error', 'starred-block'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'import', next: '*' },

      { blankLine: 'never', prev: 'import', next: 'import' },

      { blankLine: 'always', prev: '*', next: 'return' },

      { blankLine: 'always', prev: 'expression', next: 'if' },

      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },

      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },

      { blankLine: 'always', prev: '*', next: 'block-like' },

      { blankLine: 'always', prev: 'if', next: '*' },

      { blankLine: 'always', prev: '*', next: 'function' },

      { blankLine: 'always', prev: 'function', next: '*' },

      { blankLine: 'always', prev: 'expression', next: 'expression' },
    ],
  },
});
