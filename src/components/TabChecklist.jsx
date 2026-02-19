import { useState } from 'react'
import { useApp } from '../AppContext'
import { CHECKLIST_GRUPOS } from '../data'

export default function TabChecklist() {
  const { checkState, toggleCheck, doneCheck, totalCheck } = useApp()
  const [openGroups, setOpenGroups] = useState({ porfora: true })

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
                      const isChecked = item.fixo || !!checkState[item.id]
                      return (
                        <tr
                          key={item.id}
                          className={`porfora-row ${isChecked ? 'porfora-ok' : 'porfora-pending'}`}
                          onClick={() => !item.fixo && toggleCheck(item.id)}
                          style={{ cursor: item.fixo ? 'default' : 'pointer' }}
                        >
                          <td className="porfora-check-cell">
                            <span className={`porfora-check ${isChecked ? 'porfora-check-done' : ''}`}>
                              {isChecked ? '✓' : ''}
                            </span>
                          </td>
                          <td className="porfora-label">{item.label}</td>
                          <td className="porfora-status-cell">
                            <span className={`porfora-badge ${isChecked ? 'porfora-badge-ok' : 'porfora-badge-pend'}`}>
                              {isChecked ? 'Definido' : 'A definir'}
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
    </>
  )
}
