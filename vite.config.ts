import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const rootDir = __dirname
const stylesDir = resolve(rootDir, 'src/styles')
const breakpointsPath = resolve(rootDir, 'src/foundation/breakpoints.json')
const generatedBreakpointsPath = resolve(stylesDir, 'generated-breakpoints.css')

function buildBreakpointCss() {
  const breakpoints = JSON.parse(readFileSync(breakpointsPath, 'utf8')) as Record<string, number>
  const lines = [
    '/* Generated from src/foundation/breakpoints.json */',
    ':root {',
    ...Object.entries(breakpoints).map(([name, value]) => `  --vf-breakpoint-${name}: ${value}px;`),
    '}',
    ''
  ]

  mkdirSync(stylesDir, { recursive: true })
  writeFileSync(generatedBreakpointsPath, lines.join('\n'))
}

function vueforgeStyleArtifactsPlugin(): Plugin[] {
  return [
    {
      name: 'vueforge-sync-breakpoints',
      buildStart() {
        buildBreakpointCss()
      },
      configureServer() {
        buildBreakpointCss()
      }
    },
    {
      name: 'vueforge-copy-css-entries',
      writeBundle() {
        const distDir = resolve(rootDir, 'dist')

        mkdirSync(distDir, { recursive: true })

        for (const file of ['tokens.css', 'theme.css', 'foundation.css', 'generated-breakpoints.css']) {
          cpSync(resolve(stylesDir, file), resolve(distDir, file))
        }
      }
    }
  ]
}

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    ...vueforgeStyleArtifactsPlugin(),
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
