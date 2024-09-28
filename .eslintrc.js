module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:react/jsx-runtime'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, {extensions: ['.ts', '.tsx', '.jsx']}],
    'react-native/no-inline-styles': 'off',
  },
};
