module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    // '/node_modules/(?!react-native-error-boundary/.*)',
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-redux)',
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
    branches: 80,
    functions: 80,
    lines: 80,
    statements: -10,
  },
  setupFiles: ['<rootDir>/setup-jest.js'],
};
