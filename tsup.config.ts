import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  external: [
    "@antfu/eslint-config",
  ],
  format: ['cjs', 'esm'],
  shims: true,
  dts: true,
  clean: true,
})