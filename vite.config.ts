import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.spec.ts', 'src/test/**', 'src/dev/**'],
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'foundation-api': resolve(__dirname, 'src/foundation/index.ts'),
        'theme-api': resolve(__dirname, 'src/theme/public.ts')
      },
      name: 'VueforgeCore',
      cssFileName: 'styles',
      fileName: (_format, entryName) => `${entryName === 'index' ? 'vueforge-core' : entryName}.js`,
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue', '@codemonster-ru/vueiconify', '@codemonster-ru/floater.js'],
      output: {}
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts'
  }
})
