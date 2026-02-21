import chunks from './docs-chunks.json'

/* Para um corpus pequeno (8 páginas / 8 chunks), enviamos TODOS os documentos
   como contexto. Isso garante que o LLM tenha acesso completo ao conteúdo. */
export function retrieveChunks() {
  return chunks
}
