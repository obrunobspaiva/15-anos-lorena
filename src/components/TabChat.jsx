import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

export default function TabChat() {
  const [messages, setMessages] = useState([])
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [fetching, setFetching] = useState(true)
  const bottomRef = useRef(null)

  /* ── Carrega histórico ao montar ── */
  useEffect(() => {
    supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(50)
      .then(({ data }) => {
        if (data) setMessages(data)
        setFetching(false)
      })

    /* Realtime: novas mensagens de outros dispositivos */
    const ch = supabase
      .channel('chat_rt')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' },
        ({ new: row }) => setMessages(prev => {
          if (prev.find(m => m.id === row.id)) return prev
          return [...prev, row]
        })
      )
      .subscribe()

    return () => supabase.removeChannel(ch)
  }, [])

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

    /* 1. Salva mensagem do usuário */
    await supabase
      .from('chat_messages')
      .insert({ role: 'user', content: text })

    const historyForApi = [
      ...messages.map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: text },
    ]

    /* 2. Chama Edge Function via supabase.functions.invoke (auth automático) */
    try {
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: { messages: historyForApi },
      })

      if (error) throw new Error(error.message)

      /* 3. Salva resposta do assistente */
      await supabase
        .from('chat_messages')
        .insert({ role: 'assistant', content: data.reply })
    } catch (err) {
      await supabase
        .from('chat_messages')
        .insert({ role: 'assistant', content: '⚠️ Erro ao obter resposta. Tente novamente.' })
    }

    setLoading(false)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  async function limpar() {
    if (!window.confirm('Apagar todo o histórico do chat?')) return
    await supabase.from('chat_messages').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    setMessages([])
  }

  return (
    <div className="chat-wrap">
      {/* HEADER */}
      <div className="chat-header">
        <div>
          <span className="chat-header-title">💬 Assistente da Festa</span>
          <span className="chat-header-sub">Pergunte sobre o evento, orçamento, cronograma…</span>
        </div>
        <button className="chat-clear-btn" onClick={limpar} title="Limpar histórico">🗑️</button>
      </div>

      {/* MENSAGENS */}
      <div className="chat-messages">
        {fetching ? (
          <div className="chat-loading-init">Carregando histórico…</div>
        ) : messages.length === 0 ? (
          <div className="chat-empty">
            <p>Olá! Sou o assistente da festa de 15 anos da Lorena.</p>
            <p>Posso ajudar com dúvidas sobre o evento, orçamento, fornecedores e cronograma.</p>
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
