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
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueforgeCore',
      cssFileName: 'styles',
      fileName: 'vueforge-core',
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
