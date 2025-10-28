import { defineConfig } from 'vitest/config'
import dotenv from 'dotenv'
import tsConfigPaths from 'vite-tsconfig-paths'

dotenv.config({ path: '.env.test' })

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    include: ['src/**/*.e2e.spec.ts'],
    testTimeout: 20000,
    setupFiles: ['./vitest.setup.ts'],
    fileParallelism: false,
  },
})
