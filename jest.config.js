/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^~/(.*)$': '<rootDir>/src/app/$1',
    "\\.(jpg|jpeg|png|gif|svg)$": "identity-obj-proxy",
  },
  "transform": {
    "^.+\\.jsx?$": "babel-jest"
  },
  testTimeout: 10000,
};