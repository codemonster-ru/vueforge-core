import process from 'node:process'
import { cpSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const dist = resolve(root, 'dist')

mkdirSync(dist, { recursive: true })

for (const file of ['tokens.css', 'theme.css', 'foundation.css', 'generated-breakpoints.css']) {
  cpSync(resolve(root, 'src/styles', file), resolve(dist, file))
}
