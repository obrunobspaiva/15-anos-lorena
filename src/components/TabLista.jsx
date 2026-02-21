import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useToast } from '../useToast'

const EMPTY_FORM = { nome: '', grupo: 'Adulto', de_onde: '', whatsapp: '' }
const CAMPO_LABELS = { convidado: 'Convidado', provavel: 'Provável', confirmado: 'Confirmado', foi: 'Foi' }

function fmt(v) { return v ? 'Sim' : 'Não' }

/* ── WhatsApp helpers ── */
function formatWhatsapp(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function whatsappToDb(display) {
  const digits = display.replace(/\D/g, '')
  if (digits.length !== 11) return ''
  return '55' + digits
}

function dbToWhatsapp(db) {
  if (!db) return ''
  const digits = db.startsWith('55') ? db.slice(2) : db
  return formatWhatsapp(digits)
}

export default function TabLista() {
  const [lista,    setLista]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [modal,    setModal]    = useState(false)
  const [editando, setEditando] = useState(null)
  const [form,     setForm]     = useState(EMPTY_FORM)
  const [filtroGrupo,       setFiltroGrupo]       = useState('todos')
  const [filtroStatus,      setFiltroStatus]      = useState('todos')
  const [busca,             setBusca]             = useState('')
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null)
  const [confirmExcluir,   setConfirmExcluir]   = useState(null)
  const [resumoAberto,     setResumoAberto]     = useState(false)
  const [filtrosAberto,    setFiltrosAberto]    = useState(false)
  const toast = useToast()

  /* ── Carga e real-time ── */
  useEffect(() => {
    carregar()
    const ch = supabase
      .channel('lista_rt')
      .on('postgres_changes', { event: '*',    schema: 'public', table: 'convidados'     }, carregar)
      .subscribe()
    return () => supabase.removeChannel(ch)
  }, [])

  function carregar() {
    supabase.from('convidados').select('*').order('ordem', { ascending: true })
      .then(({ data, error }) => {
        if (error) { toast.error('Erro ao carregar convidados'); return }
        if (data) setLista(data)
        setLoading(false)
        setUltimaAtualizacao(new Date())
      })
  }

  async function registrarLog(acao, nome, detalhes = '') {
    await supabase.from('logs_convidados').insert({ acao, convidado_nome: nome, detalhes })
  }

  /* ── Stats ── */
  const total        = lista.length
  const nConvidado   = lista.filter(c => c.convidado).length
  const nProvavel    = lista.filter(c => c.provavel && !c.confirmado).length
  const nConfirmado  = lista.filter(c => c.confirmado).length
  const nFoi         = lista.filter(c => c.foi).length
  const nAdulto      = lista.filter(c => c.grupo === 'Adulto').length
  const nAdolescente = lista.filter(c => c.grupo === 'Adolescente').length
  const nComWhatsapp  = lista.filter(c => c.whatsapp).length
  const nSemWhatsapp  = total - nComWhatsapp
  const origens = ['Mãe', 'Pai', 'Amigos'].map(o => ({
    label: o, count: lista.filter(c => c.de_onde === o).length,
  }))
  const nOutros = total - origens.reduce((s, o) => s + o.count, 0)

  /* ── Filtro ── */
  const filtrada = lista
    .filter(c => filtroGrupo === 'todos' || c.grupo === filtroGrupo)
    .filter(c => {
      if (filtroStatus === 'convidado')  return c.convidado
      if (filtroStatus === 'provavel')   return c.provavel && !c.confirmado
      if (filtroStatus === 'confirmado') return c.confirmado
      if (filtroStatus === 'foi')        return c.foi
      return true
    })
    .filter(c => !busca || c.nome.toLowerCase().includes(busca.toLowerCase()))

  /* ── CRUD ── */
  async function salvar() {
    if (!form.nome.trim()) { toast.warn('Preencha o nome do convidado'); return }
    if (!form.grupo)       { toast.warn('Selecione o grupo'); return }
    if (!form.de_onde)     { toast.warn('Selecione de onde conhece'); return }
    const wppDigits = form.whatsapp.replace(/\D/g, '')
    if (wppDigits.length > 0 && wppDigits.length !== 11) {
      toast.warn('WhatsApp inválido. Use o formato (99) 99999-9999')
      return
    }
    const whatsappDb = whatsappToDb(form.whatsapp)
    const nomeLower = form.nome.trim().toLowerCase()
    const duplicNome = lista.find(c => c.nome.toLowerCase() === nomeLower && c.id !== editando?.id)
    if (duplicNome) { toast.warn(`Já existe um convidado com o nome "${duplicNome.nome}"`); return }
    if (whatsappDb) {
      const duplicWpp = lista.find(c => c.whatsapp === whatsappDb && c.id !== editando?.id)
      if (duplicWpp) { toast.warn(`WhatsApp já cadastrado para "${duplicWpp.nome}"`); return }
    }
    try {
      if (editando) {
        const { error } = await supabase.from('convidados').update({
          nome: form.nome, grupo: form.grupo, de_onde: form.de_onde, whatsapp: whatsappDb || null,
        }).eq('id', editando.id)
        if (error) throw error
        const mudancas = []
        if (form.nome       !== editando.nome)              mudancas.push(`Nome: "${editando.nome}" → "${form.nome}"`)
        if (form.grupo      !== editando.grupo)             mudancas.push(`Grupo: ${editando.grupo} → ${form.grupo}`)
        if (form.de_onde    !== (editando.de_onde || ''))   mudancas.push(`De onde: "${editando.de_onde || '—'}" → "${form.de_onde || '—'}"`)
        const oldWpp = editando.whatsapp || ''
        if (whatsappDb !== oldWpp) mudancas.push(`WhatsApp: ${oldWpp || '—'} → ${whatsappDb || '—'}`)
        if (mudancas.length) await registrarLog('Editou', editando.nome, mudancas.join(' · '))
      } else {
        const maxOrdem = lista.reduce((m, c) => Math.max(m, c.ordem || 0), 0)
        const { error } = await supabase.from('convidados').insert({
          nome: form.nome, grupo: form.grupo, de_onde: form.de_onde, whatsapp: whatsappDb || null,
          ordem: maxOrdem + 1,
        })
        if (error) throw error
        await registrarLog('Adicionou', form.nome, `${form.grupo} · ${form.de_onde}`)
      }
      setUltimaAtualizacao(new Date())
      fechar()
    } catch {
      toast.error('Erro ao salvar convidado. Tente novamente.')
    }
  }

  function excluir(id) {
    const c = lista.find(x => x.id === id)
    if (!c) return
    setConfirmExcluir(c)
  }

  async function confirmarExclusao() {
    const c = confirmExcluir
    setConfirmExcluir(null)
    if (!c) return
    try {
      const { error } = await supabase.from('convidados').delete().eq('id', c.id)
      if (error) throw error
      await registrarLog('Excluiu', c.nome, `${c.grupo}${c.de_onde ? ' · ' + c.de_onde : ''}`)
      setUltimaAtualizacao(new Date())
    } catch {
      toast.error('Erro ao excluir convidado. Tente novamente.')
    }
  }

  async function toggle(id, field) {
    const c = lista.find(x => x.id === id)
    const novoValor = !c[field]
    try {
      const { error } = await supabase.from('convidados').update({ [field]: novoValor }).eq('id', id)
      if (error) throw error
      await registrarLog(
        novoValor ? 'Marcou' : 'Desmarcou',
        c.nome,
        `${CAMPO_LABELS[field]}: ${fmt(!novoValor)} → ${fmt(novoValor)}`
      )
      setUltimaAtualizacao(new Date())
    } catch {
      toast.error('Erro ao atualizar status. Tente novamente.')
    }
  }

  function abrir(convidado = null) {
    setEditando(convidado)
    setForm(convidado ? {
      nome: convidado.nome, grupo: convidado.grupo, de_onde: convidado.de_onde || '',
      whatsapp: dbToWhatsapp(convidado.whatsapp),
    } : EMPTY_FORM)
    setModal(true)
  }

  function fechar() { setModal(false); setEditando(null); setForm(EMPTY_FORM) }

  if (loading) return (
    <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>
      Carregando lista...
    </div>
  )

  return (
    <>
      {/* ── RESUMO (accordion) ── */}
      <div className="accordion">
        <button className={`accordion-btn${resumoAberto ? ' open' : ''}`} onClick={() => setResumoAberto(v => !v)}>
          <span>👥 Resumo — {total} convidados</span>
          {ultimaAtualizacao && (
            <span className="lista-ultima-atualizacao" style={{ marginLeft: 'auto', marginRight: 8 }}>
              {ultimaAtualizacao.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </button>
        <div className={`accordion-body${resumoAberto ? ' open' : ''}`}>
          <div className="lista-stats-grid lista-stats-5">
            <div className="lista-stat"><span className="lista-stat-num">{total}</span><span className="lista-stat-label">Total</span></div>
            <div className="lista-stat"><span className="lista-stat-num" style={{ color: 'var(--wine)' }}>{nConvidado}</span><span className="lista-stat-label">Convidado</span></div>
            <div className="lista-stat"><span className="lista-stat-num warn">{nProvavel}</span><span className="lista-stat-label">Provável</span></div>
            <div className="lista-stat"><span className="lista-stat-num success">{nConfirmado}</span><span className="lista-stat-label">Confir.</span></div>
            <div className="lista-stat"><span className="lista-stat-num info">{nFoi}</span><span className="lista-stat-label">Foi</span></div>
          </div>

          <div className="lista-grupo-grid">
            <div className="lista-grupo-item">
              <span className="lista-grupo-num">{nAdulto}</span>
              <div><span className="lista-grupo-label">Adultos</span><span className="lista-grupo-pct">{total ? Math.round(nAdulto / total * 100) : 0}%</span></div>
            </div>
            <div className="lista-grupo-item">
              <span className="lista-grupo-num">{nAdolescente}</span>
              <div><span className="lista-grupo-label">Adolescentes</span><span className="lista-grupo-pct">{total ? Math.round(nAdolescente / total * 100) : 0}%</span></div>
            </div>
          </div>

          <div className="lista-origem">
            {origens.map(o => (
              <div key={o.label} className="lista-origem-item">
                <span className="lista-origem-label">{o.label}</span>
                <span className="lista-origem-count">{o.count}</span>
                <span className="lista-origem-pct">{total ? Math.round(o.count / total * 100) : 0}%</span>
              </div>
            ))}
            <div className="lista-origem-item">
              <span className="lista-origem-label">Outros</span>
              <span className="lista-origem-count">{nOutros}</span>
              <span className="lista-origem-pct">{total ? Math.round(nOutros / total * 100) : 0}%</span>
            </div>
          </div>

          <div className="lista-whatsapp-stats">
            <span className="lista-whatsapp-title">WhatsApp</span>
            <div className="lista-whatsapp-bar">
              <div className="lista-whatsapp-fill" style={{ width: total ? `${Math.round(nComWhatsapp / total * 100)}%` : '0%' }} />
            </div>
            <div className="lista-whatsapp-nums">
              <span className="lista-whatsapp-ok">{nComWhatsapp} com</span>
              <span className="lista-whatsapp-miss">{nSemWhatsapp} sem</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTROS (accordion) ── */}
      <div className="accordion">
        <button className={`accordion-btn${filtrosAberto ? ' open' : ''}`} onClick={() => setFiltrosAberto(v => !v)}>
          <span>🔍 Busca e Filtros</span>
          {(busca || filtroGrupo !== 'todos' || filtroStatus !== 'todos') && (
            <span className="lista-filtro-badge" style={{ marginLeft: 'auto', marginRight: 8 }}>Ativo</span>
          )}
        </button>
        <div className={`accordion-body${filtrosAberto ? ' open' : ''}`} style={{ padding: '12px 14px' }}>
          <input
            className="lista-search"
            type="text"
            placeholder="Buscar convidado..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
          <div className="lista-filter-row">
            <div className="filter-chips" style={{ marginBottom: 0, flexWrap: 'nowrap', overflowX: 'auto' }}>
              {[['todos', 'Todos'], ['Adulto', 'Adultos'], ['Adolescente', 'Adolesc.']].map(([v, l]) => (
                <button key={v} className={`chip ${filtroGrupo === v ? 'active' : ''}`} onClick={() => setFiltroGrupo(v)}>{l}</button>
              ))}
            </div>
            <div className="filter-chips" style={{ marginBottom: 0, flexWrap: 'nowrap', overflowX: 'auto' }}>
              {[['todos', 'Todos'], ['convidado', 'Convidado'], ['provavel', 'Provável'], ['confirmado', 'Confirm.'], ['foi', 'Foi']].map(([v, l]) => (
                <button key={v} className={`chip ${filtroStatus === v ? 'active' : ''}`} onClick={() => setFiltroStatus(v)}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── LISTA ── */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="lista-table-header">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
            {filtrada.length} convidado{filtrada.length !== 1 ? 's' : ''}
          </span>
          <button className="lista-add-btn" onClick={() => abrir()}>+ Adicionar</button>
        </div>

        {filtrada.length === 0 ? (
          <div style={{ padding: '28px', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.85rem' }}>
            Nenhum convidado encontrado.
          </div>
        ) : (
          filtrada.map(c => (
            <div key={c.id} className="lista-row">
              <span className="lista-num">{lista.indexOf(c) + 1}</span>
              <div className="lista-info">
                <span className="lista-nome">{c.nome}</span>
                <div className="lista-tags">
                  <span className={`lista-tag ${c.grupo === 'Adulto' ? 'lista-tag-adulto' : 'lista-tag-adol'}`}>
                    {c.grupo === 'Adulto' ? 'Adulto' : 'Adol.'}
                  </span>
                  {c.de_onde && <span className="lista-tag lista-tag-origem">{c.de_onde}</span>}
                </div>
              </div>
              <div className="lista-flags">
                <button className={`lista-flag ${c.convidado  ? 'flag-wine'    : ''}`} onClick={() => toggle(c.id, 'convidado')}  title="Convidado">Cv</button>
                <button className={`lista-flag ${c.provavel   ? 'flag-warn'    : ''}`} onClick={() => toggle(c.id, 'provavel')}   title="Provável">P</button>
                <button className={`lista-flag ${c.confirmado ? 'flag-success' : ''}`} onClick={() => toggle(c.id, 'confirmado')} title="Confirmado">C</button>
                <button className={`lista-flag ${c.foi        ? 'flag-info'    : ''}`} onClick={() => toggle(c.id, 'foi')}        title="Foi">F</button>
              </div>
              <div className="lista-actions">
                <button className="lista-action-btn" onClick={() => abrir(c)}>✏️</button>
                <button className="lista-action-btn" onClick={() => excluir(c.id)}>🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── MODAL ── */}
      {modal && (
        <div className="modal-overlay" onClick={fechar}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editando ? 'Editar Convidado' : 'Novo Convidado'}</h3>
              <button className="modal-close" onClick={fechar}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <label className="modal-label">Nome *</label>
                <input className="modal-input" value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} placeholder="Nome do convidado" autoFocus />
              </div>
              <div className="modal-field">
                <label className="modal-label">Grupo *</label>
                <div className="modal-radio-group">
                  {['Adulto', 'Adolescente'].map(g => (
                    <label key={g} className={`modal-radio ${form.grupo === g ? 'selected' : ''}`}>
                      <input type="radio" name="grupo" checked={form.grupo === g} onChange={() => setForm(f => ({ ...f, grupo: g }))} />
                      {g}
                    </label>
                  ))}
                </div>
              </div>
              <div className="modal-field">
                <label className="modal-label">De Onde *</label>
                <div className="modal-radio-group">
                  {['Mãe', 'Pai', 'Amigos', 'Outros'].map(o => (
                    <label key={o} className={`modal-radio ${form.de_onde === o ? 'selected' : ''}`}>
                      <input type="radio" name="de_onde" checked={form.de_onde === o} onChange={() => setForm(f => ({ ...f, de_onde: o }))} />
                      {o}
                    </label>
                  ))}
                </div>
              </div>
              <div className="modal-field">
                <label className="modal-label">WhatsApp</label>
                <input
                  className="modal-input"
                  value={form.whatsapp}
                  onChange={e => setForm(f => ({ ...f, whatsapp: formatWhatsapp(e.target.value) }))}
                  placeholder="(99) 99999-9999"
                  inputMode="tel"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn-cancel" onClick={fechar}>Cancelar</button>
              <button className="modal-btn-save" onClick={salvar}>Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* ── CONFIRM EXCLUIR ── */}
      {confirmExcluir && (
        <div className="modal-overlay confirm-overlay" onClick={() => setConfirmExcluir(null)}>
          <div className="confirm-box" onClick={e => e.stopPropagation()}>
            <div className="confirm-icon">🗑️</div>
            <h3 className="confirm-title">Excluir convidado?</h3>
            <p className="confirm-nome">{confirmExcluir.nome}</p>
            <p className="confirm-desc">
              {confirmExcluir.grupo}{confirmExcluir.de_onde ? ` · ${confirmExcluir.de_onde}` : ''}
            </p>
            <p className="confirm-aviso">Esta ação não pode ser desfeita.</p>
            <div className="confirm-actions">
              <button className="confirm-btn-cancel" onClick={() => setConfirmExcluir(null)}>Cancelar</button>
              <button className="confirm-btn-delete" onClick={confirmarExclusao}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
