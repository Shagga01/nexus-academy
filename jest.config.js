module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['/_tests_//.ts', '/?(.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};