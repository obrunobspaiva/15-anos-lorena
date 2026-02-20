import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { CHECKLIST_GRUPOS, PENDENCIAS } from './data'
import { supabase } from './lib/supabase'

/* ── localStorage helpers (cache offline) ── */
function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback }
  catch { return fallback }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* noop */ }
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [checkState, setCheckState] = useState(() => load('lorena15_checklist', {}))
  const [pendState,  setPendState]  = useState(() => load('lorena15_pendencias', {}))
  const [cerState,   setCerState]   = useState(() => load('lorena15_cerimonia',  {}))
  const [ideiaState, setIdeiaState] = useState(() => load('lorena15_ideias',     {}))

  /* ── Supabase: carga inicial + real-time ── */
  useEffect(() => {
    // Busca estado atual do servidor
    supabase
      .from('app_state')
      .select('id, data')
      .in('id', ['checklist', 'pendencias', 'cerimonia', 'ideias'])
      .then(({ data, error }) => {
        if (error || !data) return
        data.forEach(row => {
          if (row.id === 'checklist') { setCheckState(row.data); save('lorena15_checklist', row.data) }
          if (row.id === 'pendencias') { setPendState(row.data);  save('lorena15_pendencias', row.data) }
          if (row.id === 'cerimonia')  { setCerState(row.data);   save('lorena15_cerimonia',  row.data) }
          if (row.id === 'ideias')     { setIdeiaState(row.data); save('lorena15_ideias',     row.data) }
        })
      })

    // Escuta mudanças em tempo real de outros dispositivos
    const channel = supabase
      .channel('app_state_changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'app_state' },
        ({ new: row }) => {
          if (row.id === 'checklist') { setCheckState(row.data); save('lorena15_checklist', row.data) }
          if (row.id === 'pendencias') { setPendState(row.data);  save('lorena15_pendencias', row.data) }
          if (row.id === 'cerimonia')  { setCerState(row.data);   save('lorena15_cerimonia',  row.data) }
          if (row.id === 'ideias')     { setIdeiaState(row.data); save('lorena15_ideias',     row.data) }
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  /* ── Sync helper ── */
  function syncToSupabase(id, data) {
    supabase.from('app_state').upsert({ id, data }).then()
  }

  /* ── Checklist ── */
  const toggleCheck = useCallback((id) => {
    setCheckState(prev => {
      const next = { ...prev, [id]: !prev[id] }
      save('lorena15_checklist', next)
      syncToSupabase('checklist', next)
      return next
    })
  }, [])

  const allItems   = CHECKLIST_GRUPOS.flatMap(g => g.itens)
  const totalCheck = allItems.length
  const doneCheck  = allItems.filter(i => i.fixo || !!checkState[i.id]).length
  const progress   = totalCheck ? Math.round((doneCheck / totalCheck) * 100) : 0

  /* ── Pendências ── */
  const togglePend = useCallback((id) => {
    setPendState(prev => {
      const next = { ...prev, [id]: !prev[id] }
      save('lorena15_pendencias', next)
      syncToSupabase('pendencias', next)
      return next
    })
  }, [])

  /* Pendência está aberta se o item correspondente do checklist (checkId) não foi marcado */
  const porforaItens = CHECKLIST_GRUPOS.find(g => g.id === 'porfora')?.itens ?? []
  function isPendOpen(p) {
    const item = porforaItens.find(i => i.id === p.checkId)
    if (!item) return !pendState[p.id]          // fallback
    return !(item.fixo || !!checkState[item.id]) // segue o checklist
  }
  const openPend = PENDENCIAS.filter(isPendOpen).length

  /* ── Ideias & Extras ── */
  const toggleIdeia = useCallback((id) => {
    setIdeiaState(prev => {
      const next = { ...prev, [id]: !prev[id] }
      save('lorena15_ideias', next)
      syncToSupabase('ideias', next)
      return next
    })
  }, [])

  /* ── Cerimônia checklist ── */
  const toggleCer = useCallback((id) => {
    setCerState(prev => {
      const next = { ...prev, [id]: !prev[id] }
      save('lorena15_cerimonia', next)
      syncToSupabase('cerimonia', next)
      return next
    })
  }, [])

  /* ── Próxima pendência (baseada no checkState / app_state) ── */
  const proximaPendencia = PENDENCIAS
    .filter(isPendOpen)
    .map(p => {
      const [d, m, y] = p.prazo.split('/')
      return { ...p, dateObj: new Date(+y, +m - 1, +d) }
    })
    .sort((a, b) => a.dateObj - b.dateObj)[0] ?? null

  return (
    <AppContext.Provider value={{
      checkState, toggleCheck, totalCheck, doneCheck, progress,
      pendState,  togglePend,  openPend,
      cerState,   toggleCer,
      ideiaState, toggleIdeia,
      proximaPendencia,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
