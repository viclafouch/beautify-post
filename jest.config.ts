/* eslint-disable @typescript-eslint/no-var-requires */
import type { InitialOptionsTsJest } from 'ts-jest/dist/types'

const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

const config: InitialOptionsTsJest = {
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
  globals: {
    'ts-jest': {
      useESM: true
    }
  }
}

export default config
