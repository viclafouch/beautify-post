import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

const config: JestConfigWithTsJest = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/'
  }),
  testRegex: '\\.test\\.ts',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testTimeout: 20000,
  testEnvironment: 'jest-environment-jsdom-global',
  setupFilesAfterEnv: ['jest-extended/all'],
  preset: 'ts-jest/presets/default-esm',
  verbose: true,
  setupFiles: ['dotenv/config'],
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true
      }
    ]
  }
}

export default config
