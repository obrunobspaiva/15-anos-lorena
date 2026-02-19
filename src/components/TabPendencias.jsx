import { useState } from 'react'
import { useApp } from '../AppContext'
import { PENDENCIAS, CHECKLIST_GRUPOS } from '../data'
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
  const { checkState, toggleCheck, openPend } = useApp()
  const porforaItens = CHECKLIST_GRUPOS.find(g => g.id === 'porfora')?.itens ?? []
  const [filtro, setFiltro] = useState('todas')

  function isDone(p) {
    const item = porforaItens.find(i => i.id === p.checkId)
    return item ? (item.fixo || !!checkState[item.id]) : false
  }

  const filtered = PENDENCIAS.filter(p => {
    if (filtro === 'concluida') return isDone(p)
    if (filtro === 'todas')     return !isDone(p)
    return p.prioridade === filtro && !isDone(p)
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

      {/* TABELA */}
      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: '0.85rem', padding: 24 }}>
          {filtro === 'concluida'
            ? '🎉 Nenhuma pendência concluída ainda.'
            : '✅ Nenhuma pendência nessa categoria!'}
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-scroll">
            <table className="pend-table">
              <thead>
                <tr>
                  <th className="pend-th pend-th-check"></th>
                  <th className="pend-th">Tarefa</th>
                  <th className="pend-th pend-th-center">Prioridade</th>
                  <th className="pend-th pend-th-center">Prazo</th>
                  <th className="pend-th pend-th-center">Resp.</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => {
                  const done = !!pendState[p.id]
                  const dias = daysUntil(p.prazo)
                  return (
                    <tr
                      key={p.id}
                      className={`pend-tr ${done ? 'pend-tr-done' : ''}`}
                      onClick={() => p.checkId && toggleCheck(p.checkId)}
                    >
                      <td className="pend-td pend-td-check">
                        <span className={`pend-check ${done ? 'pend-check-done' : ''}`}>
                          {done ? '✓' : ''}
                        </span>
                      </td>
                      <td className="pend-td pend-td-task">
                        <span className={done ? 'pend-task-done' : ''}>{p.titulo}</span>
                        {p.obs && <span className="pend-obs">{p.obs}</span>}
                      </td>
                      <td className="pend-td pend-td-center">
                        <Tag type={PRIO_TYPE[p.prioridade]}>{PRIO_LABEL[p.prioridade]}</Tag>
                      </td>
                      <td className="pend-td pend-td-center pend-td-prazo">
                        {p.prazo}
                        {!done && dias <= 30 && dias > 0 && (
                          <span className="pend-dias-alert"> ({dias}d)</span>
                        )}
                        {!done && dias <= 0 && (
                          <span className="pend-dias-alert"> HOJE</span>
                        )}
                      </td>
                      <td className="pend-td pend-td-center">{p.resp}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
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
