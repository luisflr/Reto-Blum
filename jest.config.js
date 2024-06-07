module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.+(spec|test).ts?(x)'],
  modulePathIgnorePatterns: ['<rootDir>/.aws-sam'],
  clearMocks: true,
  reporters: ['default', 'jest-junit'],
  coverageThreshold: {
    global: {
      statements: 80,
    },
  },
};
