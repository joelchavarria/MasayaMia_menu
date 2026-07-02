import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const driveFileId = process.env.DRIVE_FILE_ID ?? '1E1IGyMsmNXv5oSZI2yf98_UIuaLLlxZJ'
const pdfUrl = `https://drive.google.com/uc?export=download&id=${driveFileId}`
const tmpDir = 'tmp/pdfs'
const outputDir = 'public/menu'
const pdfPath = join(tmpDir, 'masaya-mia-menu.pdf')
const pdftoppmCandidates = [
  process.env.PDFTOPPM,
  'pdftoppm',
  join(
    process.env.HOME ?? '',
    '.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/pdftoppm',
  ),
].filter(Boolean)

function findPdftoppm() {
  for (const candidate of pdftoppmCandidates) {
    try {
      execFileSync(candidate, ['-h'], { stdio: 'ignore' })
      return candidate
    } catch {
      // Try the next candidate.
    }
  }

  throw new Error('No se encontro pdftoppm. Instala Poppler con: brew install poppler')
}

function run(command, args) {
  execFileSync(command, args, { stdio: 'inherit' })
}

mkdirSync(tmpDir, { recursive: true })
mkdirSync(outputDir, { recursive: true })

console.log('Descargando PDF del menu...')
run('curl', ['-L', pdfUrl, '-o', pdfPath])

console.log('Regenerando imagenes del menu...')
rmSync(outputDir, { force: true, recursive: true })
mkdirSync(outputDir, { recursive: true })

run(findPdftoppm(), [
  '-r',
  '160',
  '-jpeg',
  '-jpegopt',
  'quality=82,optimize=y,progressive=y',
  pdfPath,
  join(outputDir, 'page'),
])

const pages = readdirSync(outputDir)
  .filter((file) => /^page-\d+\.jpg$/.test(file))
  .sort()
  .map((file, index) => ({
    number: index + 1,
    src: `/menu/${file}`,
    alt: `Pagina ${index + 1} del menu de Masaya Mia`,
  }))

if (pages.length === 0) {
  throw new Error('No se generaron imagenes del menu.')
}

writeFileSync(
  'src/menuPages.js',
  `export const menuPages = ${JSON.stringify(pages, null, 2)}\n`,
)

if (existsSync(pdfPath)) {
  console.log(`Menu actualizado: ${pages.length} paginas generadas.`)
}
