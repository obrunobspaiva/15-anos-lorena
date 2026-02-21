import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { retrieveChunks } from '../rag'

const STORAGE_KEY = 'lorena15_chat'

function loadMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveMessages(msgs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs))
}

let msgCounter = Date.now()

export default function TabChat() {
  const [messages, setMessages] = useState(loadMessages)
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const bottomRef = useRef(null)

  /* ── Persiste no localStorage a cada mudança ── */
  useEffect(() => {
    saveMessages(messages)
  }, [messages])

  /* ── Scroll automático ── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  /* ── Enviar mensagem ── */
  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setLoading(true)

    const userMsg = { id: ++msgCounter, role: 'user', content: text }
    const updated = [...messages, userMsg]
    setMessages(updated)

    /* Retrieval: busca chunks relevantes nos documentos */
    const relevantDocs = retrieveChunks(text)

    const historyForApi = updated.map(m => ({ role: m.role, content: m.content }))

    try {
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: { messages: historyForApi, context: relevantDocs },
      })

      if (error) throw new Error(error.message)

      const assistantMsg = { id: ++msgCounter, role: 'assistant', content: data.reply }
      setMessages(prev => [...prev, assistantMsg])
    } catch {
      const errorMsg = { id: ++msgCounter, role: 'assistant', content: '⚠️ Erro ao obter resposta. Tente novamente.' }
      setMessages(prev => [...prev, errorMsg])
    }

    setLoading(false)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  function limpar() {
    if (!window.confirm('Apagar todo o histórico do chat?')) return
    localStorage.removeItem(STORAGE_KEY)
    setMessages([])
  }

  return (
    <div className="chat-wrap">
      {/* HEADER */}
      <div className="chat-header">
        <div>
          <span className="chat-header-title">💬 Assistente da Festa</span>
          <span className="chat-header-sub">Pergunte sobre o evento, orçamento, contratos…</span>
        </div>
        <button className="chat-clear-btn" onClick={limpar} title="Limpar histórico">🗑️</button>
      </div>

      {/* MENSAGENS */}
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-empty">
            <p>Olá! Sou o assistente da festa de 15 anos da Lorena.</p>
            <p>Posso ajudar com dúvidas sobre o evento, orçamento, contratos, fornecedores e cronograma.</p>
          </div>
        ) : (
          messages.map(m => (
            <div key={m.id} className={`chat-bubble-wrap ${m.role === 'user' ? 'chat-user' : 'chat-assistant'}`}>
              <div className={`chat-bubble ${m.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}>
                {m.content}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="chat-bubble-wrap chat-assistant">
            <div className="chat-bubble chat-bubble-assistant chat-typing">
              <span/><span/><span/>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="chat-input-wrap">
        <textarea
          className="chat-input"
          rows={1}
          placeholder="Digite sua pergunta…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={loading}
        />
        <button
          className="chat-send-btn"
          onClick={send}
          disabled={loading || !input.trim()}
        >
          ➤
        </button>
      </div>
    </div>
  )
}
