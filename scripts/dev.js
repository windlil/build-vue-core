import { createRequire } from "node:module"
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from "node:url"
import esbuild from 'esbuild'
import minimist from "minimist"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)

const args = minimist(process.argv.slice(2))
const target = args._[0] || 'reactivity'
const format = args.f || 'iife'

const entry = resolve(__dirname, `../packages/${target}/src/index.ts`)
const packages = require(`../packages/${target}/package.json`)

esbuild.context({
  entryPoints: [entry],
  outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`),
  bundle: true,
  platform: 'browser',
  sourcemap: true,
  format,
  globalName: packages?.buildOption?.name
}).then((context) => {
  console.log('start dev')
  return context.watch()
})