import { useState } from 'react'
import { useApp } from '../AppContext'
import { CHECKLIST_GRUPOS, IDEIAS } from '../data'

export default function TabChecklist() {
  const { checkState, toggleCheck, doneCheck, totalCheck, ideiaState, toggleIdeia } = useApp()
  const [openGroups, setOpenGroups] = useState({ porfora: true })
  const [openIdeias, setOpenIdeias] = useState({})
  const [ideiasSectionOpen, setIdeiasSectionOpen] = useState(true)

  const toggleIdeiasSection = () => setIdeiasSectionOpen(prev => !prev)
  const toggleIdeiaCard = (id) => setOpenIdeias(prev => ({ ...prev, [id]: !prev[id] }))

  const toggle = (id) => setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <>
      <div className="section-header">
        <h2>Checklist Geral</h2>
        <span className="badge badge-info">{doneCheck}/{totalCheck}</span>
      </div>

      {CHECKLIST_GRUPOS.map(grupo => {
        const total   = grupo.itens.length
        const checked = grupo.itens.filter(i => i.fixo || !!checkState[i.id]).length
        const isOpen  = !!openGroups[grupo.id]

        return (
          <div key={grupo.id} className={`checklist-group ${isOpen ? 'open' : ''}`}>
            <div className="checklist-group-header" onClick={() => toggle(grupo.id)}>
              <span className="checklist-group-title">{grupo.titulo}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="checklist-group-count">{checked}/{total}</span>
                <span className="checklist-group-arrow">▸</span>
              </span>
            </div>

            <div className="checklist-group-body">
              {grupo.id === 'porfora' ? (
                /* ── Tabela especial "Por Fora" ── */
                <table className="porfora-table">
                  <thead>
                    <tr>
                      <th className="porfora-th porfora-th-check"></th>
                      <th className="porfora-th">Serviço</th>
                      <th className="porfora-th porfora-th-status">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grupo.itens.map(item => {
                      const isCanceled = !!item.cancelado
                      const isChecked  = item.fixo || (!isCanceled && !!checkState[item.id])
                      const rowClass   = isCanceled ? 'porfora-canceled' : isChecked ? 'porfora-ok' : 'porfora-pending'
                      return (
                        <tr
                          key={item.id}
                          className={`porfora-row ${rowClass}`}
                          onClick={() => !item.fixo && !isCanceled && toggleCheck(item.id)}
                          style={{ cursor: (item.fixo || isCanceled) ? 'default' : 'pointer' }}
                        >
                          <td className="porfora-check-cell">
                            <span className={`porfora-check ${isCanceled ? 'porfora-check-cancel' : isChecked ? 'porfora-check-done' : ''}`}>
                              {isCanceled ? '✕' : isChecked ? '✓' : ''}
                            </span>
                          </td>
                          <td className={`porfora-label ${isCanceled ? 'porfora-label-canceled' : ''}`}>{item.label}</td>
                          <td className="porfora-status-cell">
                            <span className={`porfora-badge ${isCanceled ? 'porfora-badge-cancel' : isChecked ? 'porfora-badge-ok' : 'porfora-badge-pend'}`}>
                              {isCanceled ? 'Cancelado' : isChecked ? 'Definido' : 'A definir'}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              ) : (
                /* ── Lista checkbox padrão ── */
                <table className="checklist-table">
                  <tbody>
                    {grupo.itens.map(item => {
                      const isChecked = item.fixo || !!checkState[item.id]
                      return (
                        <tr
                          key={item.id}
                          className={`checklist-table-row ${isChecked ? 'checklist-table-row-ok' : ''}`}
                          onClick={() => !item.fixo && toggleCheck(item.id)}
                          style={{ cursor: item.fixo ? 'default' : 'pointer' }}
                        >
                          <td className="checklist-table-check-cell">
                            <span className={`checklist-table-check ${isChecked ? 'checklist-table-check-done' : ''}`}>
                              {isChecked ? '✓' : ''}
                            </span>
                          </td>
                          <td className={`checklist-table-label ${isChecked ? 'checklist-table-label-done' : ''}`}>
                            {item.label}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )
      })}

      {/* ── Seção Ideias & Extras ── */}
      <div className={`checklist-group ${ideiasSectionOpen ? 'open' : ''}`}>
        <div className="checklist-group-header" onClick={toggleIdeiasSection}>
          <span className="checklist-group-title">💡 Ideias &amp; Extras</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="checklist-group-count">{IDEIAS.length} itens</span>
            <span className="checklist-group-arrow">▸</span>
          </span>
        </div>

        <div className="checklist-group-body">
          {IDEIAS.map(ideia => {
            const totalSub = ideia.subTarefas.length
            const doneSub  = ideia.subTarefas.filter(s => !!ideiaState[s.id]).length
            const isOpen   = !!openIdeias[ideia.id]

            return (
              <div key={ideia.id} className="ideia-card">
                <div className="ideia-card-header" onClick={() => toggleIdeiaCard(ideia.id)}>
                  <div className="ideia-card-title-row">
                    <span className="ideia-status-emoji">{ideia.status}</span>
                    <span className="ideia-label">{ideia.label}</span>
                  </div>
                  <div className="ideia-card-meta">
                    <span className="ideia-badge-prazo">{ideia.prazo}</span>
                    <span className="ideia-badge-sub">{doneSub}/{totalSub}</span>
                    <span className={`ideia-arrow ${isOpen ? 'ideia-arrow-open' : ''}`}>▸</span>
                  </div>
                </div>

                {isOpen && (
                  <div className="ideia-card-body">
                    <p className="ideia-descricao">{ideia.descricao}</p>
                    <p className="ideia-custo">💰 {ideia.custo}</p>
                    <ul className="ideia-subtarefas">
                      {ideia.subTarefas.map(sub => {
                        const done = !!ideiaState[sub.id]
                        return (
                          <li
                            key={sub.id}
                            className={`ideia-sub-item ${done ? 'ideia-sub-done' : ''}`}
                            onClick={() => toggleIdeia(sub.id)}
                          >
                            <span className={`ideia-sub-check ${done ? 'ideia-sub-check-done' : ''}`}>
                              {done ? '✓' : ''}
                            </span>
                            <span className="ideia-sub-label">{sub.label}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
