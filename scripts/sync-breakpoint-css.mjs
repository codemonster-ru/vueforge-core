import process from 'node:process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const breakpointsPath = resolve(root, 'src/foundation/breakpoints.json')
const outputPath = resolve(root, 'src/styles/generated-breakpoints.css')

const breakpoints = JSON.parse(readFileSync(breakpointsPath, 'utf8'))

const lines = [
  '/* Generated from src/foundation/breakpoints.json */',
  ':root {',
  ...Object.entries(breakpoints).map(([name, value]) => `  --vf-breakpoint-${name}: ${value}px;`),
  '}',
  ''
]

mkdirSync(resolve(root, 'src/styles'), { recursive: true })
writeFileSync(outputPath, lines.join('\n'))
