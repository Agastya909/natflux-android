module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    quotes: 0,
    curly: 0,
    'react-native/no-unused-styles': 1,
    'react-native/no-inline-styles': 0,
    'react-native/split-platform-components': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 2,
    'react-native/sort-styles': 0,
    'comma-dangle': [1, 'never'],
    'prettier/prettier': [
      1,
      {singleQuote: false, printWidth: 120, semi: true, trailingComma: false},
    ],
    'react/jsx-wrap-multilines': 2,
    'react/jsx-props-no-multi-spaces': 0,
    'react/jsx-max-props-per-line': 0,
    'react/jsx-one-expression-per-line': 0,
  },
};
