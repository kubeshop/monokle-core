module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    tsconfigRootDir: __dirname,
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
    'unused-imports',
    'prettier',
  ],
  rules: {
    semi: 'error',
    'no-console': 'warn',
    'no-continue': 'off',
    'no-multiple-empty-lines': 1,
    'no-param-reassign': 'off',
    'no-undef': 'off',
    'no-useless-return': 'off',
    'no-void': 'off',
    'dot-notation': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
    'max-classes-per-file': 'off',
    'class-methods-use-this': 'off',
    'no-use-before-define': 'off',
    'no-restricted-syntax': 'off',
    'no-useless-escape': 'off',
    'no-await-in-loop': 'off',
    'no-unused-expressions': 'off',
    // Disabled old no-shadow rule as seems to be communicated by ESLint while working with TS.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
    'no-shadow': 'off',
    'no-nested-ternary': 'off',
    'no-implicit-coercion': [
      'error',
      {
        boolean: true,
        number: true,
        string: true,
      },
    ],
    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'consistent-return': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off', // typescript
    'import/extensions': 'off', // don't micromanage pretty imports
    'import/prefer-default-export': 'off',
    'lines-between-class-members': 'off',
    'max-len': 'off',
    'object-curly-newline': 'off',
    'prefer-destructuring': 'off',
    'prefer-const': 'off',
    'require-yield': 'off',
    'no-plusplus': 'off',
    'unused-imports/no-unused-imports-ts': 'error',
    'space-in-brackets': 'off',
    '@typescript-eslint/prefer-literal-enum-member': ['off'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/ban-types': ['warn'],
    '@typescript-eslint/no-empty-function': ['warn'],
    '@typescript-eslint/no-empty-interface': ['warn'],
    '@typescript-eslint/no-for-in-array': ['warn'],
    '@typescript-eslint/no-inferrable-types': ['warn'],
    '@typescript-eslint/no-misused-new': ['warn'],
    '@typescript-eslint/no-this-alias': ['warn'],
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['warn'],
    '@typescript-eslint/no-unnecessary-condition': ['off'],
    '@typescript-eslint/no-unnecessary-type-assertion': ['warn'],
    '@typescript-eslint/no-unnecessary-type-constraint': ['warn'],
    '@typescript-eslint/no-implied-eval': ['error'],
    '@typescript-eslint/prefer-optional-chain': ['warn'],
    '@typescript-eslint/restrict-plus-operands': ['warn'],
    '@typescript-eslint/restrict-template-expressions': ['off'],
    'react/jsx-no-target-blank': 'warn', // target="_blank" without rel="noreferrer" is a security risk: see https://html.spec.whatwg.org/multipage/links.html#link-type-noopener  react/jsx-no-target-blank
    'react/prop-types': 'off', // this doesn't allow us to use React.FC<>
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 0,
    'react/jsx-max-props-per-line': [1, { maximum: 1, when: 'multiline' }],
    'react/jsx-uses-react': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ], // Make ESLint happy about JSX inside of tsx files
    'react/destructuring-assignment': 'off',
    'react/no-array-index-key': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
  },
  ignorePatterns: ['./node_modules', './dist', '**/dist/*.js'],
};
