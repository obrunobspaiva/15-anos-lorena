import { useState } from 'react'
import { BLOCOS } from '../data'

/* ── MAIN COMPONENT ── */
export default function TabCronograma() {
  const [openBlocks, setOpenBlocks] = useState({})

  const toggleBlock = (num) => setOpenBlocks(prev => ({ ...prev, [num]: !prev[num] }))

  return (
    <>
      <div className="section-header">
        <h2>Cronograma</h2>
        <span className="badge badge-gold">6 horas</span>
      </div>

      <div className="timeline">
        {BLOCOS.map(b => {
          const isOpen = !!openBlocks[b.num]
          return (
            <div key={b.num} className={`timeline-block ${isOpen ? 'open' : ''}`}>
              <div className="timeline-header" onClick={() => toggleBlock(b.num)}>
                <div className="timeline-num">{b.num}</div>
                <div className="timeline-info">
                  <div className="timeline-title">{b.icone} {b.titulo}</div>
                  <div className="timeline-meta">{b.horario} · {b.duracao}</div>
                </div>
                <span className="timeline-arrow">▸</span>
              </div>
              <div className="timeline-body">
                <div className="table-scroll">
                  <table className="data-table">
                    <thead><tr><th>Horário</th><th>Atividade</th><th>Responsável</th></tr></thead>
                    <tbody>
                      {b.atividades.map((a, i) => (
                        <tr key={i}>
                          <td>{a.h}</td>
                          <td>{a.acao}</td>
                          <td>{a.resp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {b.nota && <p className="timeline-nota">{b.nota}</p>}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
