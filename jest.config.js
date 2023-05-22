module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/*\\.(test|spec)\\.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  maxConcurrency: 4,
  maxWorkers: 4,
  moduleNameMapper: {
    '^@internal': '<rootDir>/src/internal',
    '^@types': '<rootDir>/src/types',
  },
};
