import fs from 'fs'
import path from 'path'
import { PDFParse } from 'pdf-parse'

const DOCS_DIR = path.resolve('docs')
const OUTPUT = path.resolve('src/docs-chunks.json')

async function extractPdf(filePath) {
  const pdf = new PDFParse({ url: filePath })
  await pdf.load()
  const result = await pdf.getText()

  // pdf-parse v2 returns { pages: [{ text: string }, ...] }
  if (result && result.pages) {
    return result.pages.map(p => p.text).join('\n\n')
  }
  return ''
}

async function main() {
  const files = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.pdf')).sort()
  const chunks = []

  for (const file of files) {
    const filePath = path.join(DOCS_DIR, file)
    console.log(`\nProcessando: ${file}`)

    let text
    try {
      text = await extractPdf(filePath)
    } catch (err) {
      console.log(`  ERRO ao extrair texto: ${err.message}`)
      continue
    }

    if (!text || text.trim().length < 50) {
      console.log(`  Texto extraído muito curto (${text?.length || 0} chars) — PDF provavelmente é imagem escaneada`)
      continue
    }

    console.log(`  Texto extraído: ${text.length} chars`)
    const name = file.replace('.pdf', '')

    // Divide em parágrafos e agrupa em chunks de ~1500 chars
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0)
    let current = ''
    let chunkNum = 1

    for (const para of paragraphs) {
      if (current.length + para.length > 1500 && current.length > 0) {
        chunks.push({
          id: `${name}-chunk${chunkNum}`,
          source: `Documento ${file}`,
          section: `Parte ${chunkNum}`,
          content: current.trim(),
        })
        chunkNum++
        current = ''
      }
      current += para + '\n'
    }

    if (current.trim()) {
      chunks.push({
        id: `${name}-chunk${chunkNum}`,
        source: `Documento ${file}`,
        section: `Parte ${chunkNum}`,
        content: current.trim(),
      })
    }
  }

  if (chunks.length === 0) {
    console.log('\nNenhum texto extraído dos PDFs.')
  } else {
    fs.writeFileSync(OUTPUT, JSON.stringify(chunks, null, 2), 'utf-8')
    console.log(`\nExtraído ${chunks.length} chunks de ${files.length} arquivo(s) → ${OUTPUT}`)
  }

  for (const c of chunks) {
    console.log(`  ${c.id} (${c.content.length} chars)`)
  }
}

main().catch(console.error)
