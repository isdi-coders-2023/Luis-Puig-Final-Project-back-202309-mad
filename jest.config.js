/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  coveragePathIgnorePatterns: [
    'src/repos/users/users.mongo.model.ts',
    'src/app.ts',
    'src/index.ts',
  ],
  resolver: 'jest-ts-webcompat-resolver',
};
