import { useState } from 'react'
import { useApp } from '../AppContext'
import { PENDENCIAS } from '../data'
import Tag from './Tag'

const FILTERS = [
  { id: 'todas',    label: 'Todas',     cls: '' },
  { id: 'alta',     label: 'Alta',      cls: 'chip-danger' },
  { id: 'media',    label: 'Média',     cls: 'chip-warn' },
  { id: 'baixa',    label: 'Baixa',     cls: 'chip-info' },
  { id: 'concluida',label: 'Concluídas',cls: 'chip-success' },
]

const PRIO_TYPE  = { alta: 'danger', media: 'warn', baixa: 'info' }
const PRIO_LABEL = { alta: 'ALTA',   media: 'MÉDIA', baixa: 'BAIXA' }

export default function TabPendencias() {
  const { pendState, togglePend, openPend } = useApp()
  const [filtro, setFiltro] = useState('todas')

  const filtered = PENDENCIAS.filter(p => {
    if (filtro === 'concluida') return !!pendState[p.id]
    if (filtro === 'todas')     return !pendState[p.id]
    return p.prioridade === filtro && !pendState[p.id]
  })

  const today = new Date()
  function daysUntil(prazo) {
    const [d, m, y] = prazo.split('/')
    return Math.ceil((new Date(+y, +m - 1, +d) - today) / (1000 * 60 * 60 * 24))
  }

  return (
    <>
      <div className="section-header">
        <h2>Pendências</h2>
        <span className="badge badge-danger">{openPend} abertas</span>
      </div>

      {/* FILTROS */}
      <div className="filter-chips">
        {FILTERS.map(f => (
          <button
            key={f.id}
            className={`chip ${f.cls} ${filtro === f.id ? 'active' : ''}`}
            onClick={() => setFiltro(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* LISTA */}
      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: '0.85rem', padding: 24 }}>
          {filtro === 'concluida'
            ? '🎉 Nenhuma pendência concluída ainda.'
            : '✅ Nenhuma pendência nessa categoria!'}
        </div>
      ) : (
        filtered.map(p => {
          const done = !!pendState[p.id]
          const dias = daysUntil(p.prazo)
          return (
            <div key={p.id} className={`pend-card ${done ? 'done' : ''}`}>
              <input
                type="checkbox"
                checked={done}
                onChange={() => togglePend(p.id)}
              />
              <div className="pend-body">
                <div className={`pend-title ${done ? 'done-text' : ''}`}>{p.titulo}</div>
                <div className="pend-meta">
                  <Tag type={PRIO_TYPE[p.prioridade]}>{PRIO_LABEL[p.prioridade]}</Tag>
                  <span>
                    📅 {p.prazo}
                    {!done && dias <= 30 && dias > 0 && (
                      <span style={{ color: 'var(--danger)', fontWeight: 700 }}> ({dias}d)</span>
                    )}
                    {!done && dias <= 0 && (
                      <span style={{ color: 'var(--danger)', fontWeight: 700 }}> HOJE</span>
                    )}
                  </span>
                  <span>👤 {p.resp}</span>
                </div>
                {p.obs && <p className="note" style={{ marginTop: 5 }}>{p.obs}</p>}
              </div>
            </div>
          )
        })
      )}

      {/* FORNECEDORES */}
      {/* <div className="card" style={{ marginTop: 16 }}>
        <h3 className="card-title">🏢 Fornecedores</h3>

        <p className="card-subtitle">Contratados</p>
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th>Fornecedor / Serviço</th><th>Valor</th><th>Status</th></tr></thead>
            <tbody>
              {[
                ['Rosmarino Buffet (pacote completo)', 'R$ 34.990,00', 'success'],
                ['Magic Mirror (5h)',                  'R$ 2.409,00',  'success'],
                ['Orquestra / Violinista',             'R$ 1.633,50',  'success'],
                ['Cerveja Brahma DM (300 latas)',       'R$ 2.670,00',  'success'],
                ['Pacote Nice (foto + vídeo)',          'Incluso',      'success'],
              ].map(([n, v, t]) => (
                <tr key={n}>
                  <td>{n}</td><td>{v}</td>
                  <td><Tag type={t}>CONFIRMADO</Tag></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="card-subtitle" style={{ marginTop: 12 }}>Em Formalização</p>
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th>Serviço</th><th>Valor</th><th>Status</th></tr></thead>
            <tbody>
              <tr>
                <td>Retrospectiva + Projetor</td>
                <td>R$ 800,00</td>
                <td><Tag type="warn">FORMALIZAR</Tag></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="card-subtitle" style={{ marginTop: 12 }}>A Contratar</p>
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th>Serviço</th><th>Prioridade</th><th>Prazo</th></tr></thead>
            <tbody>
              {[
                ['MC / Mestre de cerimônias',         'alta',  '28/05/2026'],
                ['Banda de pagode (1h30)',             'alta',  '28/05/2026'],
                ['Maquiagem + cabelo + retoques',      'media', '28/05/2026'],
                ['Vestidos (2 looks)',                 'alta',  '30/04/2026'],
                ['Convites impressos',                 'media', '28/04/2026'],
                ['Decoração floral adicional',         'baixa', '28/05/2026'],
                ['Lembrancinhas',                      'media', '28/05/2026'],
              ].map(([n, p, d]) => (
                <tr key={n}>
                  <td>{n}</td>
                  <td><Tag type={PRIO_TYPE[p]}>{PRIO_LABEL[p]}</Tag></td>
                  <td>{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}

    </>
  )
}
