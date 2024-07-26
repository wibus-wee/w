import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  external: [
    "@antfu/eslint-config",
  ],
  shims: true,
  dts: true,
  clean: true,
})