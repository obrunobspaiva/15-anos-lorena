import { useApp } from '../AppContext'
import { PENDENCIAS } from '../data'
import Countdown from './Countdown'
import Tag from './Tag'

const PRIORIDADE_LABEL = { alta: 'ALTA', media: 'MÉDIA', baixa: 'BAIXA' }
const PRIORIDADE_TYPE  = { alta: 'danger', media: 'warn', baixa: 'info' }

export default function TabInicio() {
  const { progress, doneCheck, totalCheck, pendState, proximaPendencia } = useApp()

  const openCount = PENDENCIAS.filter(p => !pendState[p.id]).length

  return (
    <>
    {/* COUNTDOWN */}
      <div className="card">
        <h3 className="card-title">📅 Contagem Regressiva</h3>
        <Countdown />
      </div>

      {/* PROGRESSO DO CHECKLIST */}
      <div className="card">
        <h3 className="card-title">✅ Progresso do Checklist</h3>
        <div className="progress-bar-wrap">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="progress-label">
          {doneCheck} de {totalCheck} itens concluídos ({progress}%)
        </p>
      </div>

      {/* PRÓXIMA PENDÊNCIA */}
      <div className="card">
        <h3 className="card-title">⏰ Próxima Pendência</h3>
        {proximaPendencia ? (
          <div className="proxima-item">
            <span className="proxima-title">{proximaPendencia.titulo}</span>
            <div className="proxima-meta">
              <Tag type={PRIORIDADE_TYPE[proximaPendencia.prioridade]}>
                {PRIORIDADE_LABEL[proximaPendencia.prioridade]}
              </Tag>
              <span>📅 {proximaPendencia.prazo}</span>
              <span>👤 {proximaPendencia.resp}</span>
            </div>
          </div>
        ) : (
          <p style={{ color: 'var(--success)', fontWeight: 700, textAlign: 'center' }}>
            🎉 Todas as pendências concluídas!
          </p>
        )}
        {openCount > 0 && (
          <p className="note" style={{ marginTop: 8 }}>{openCount} pendência{openCount !== 1 ? 's' : ''} em aberto no total</p>
        )}
      </div>

      {/* DADOS DO EVENTO */}
      <div className="card">
        <h3 className="card-title">📋 Dados do Evento</h3>
        <table className="info-table">
          <tbody>
            <tr><td>Data</td><td><strong>28/06/2026 (domingo)</strong></td></tr>
            <tr><td>Horário</td><td>19:00 às 01:00 (6 horas)</td></tr>
            <tr><td>Local</td><td>Mansão Adélia Prado, SP</td></tr>
            <tr><td>Convidados</td><td>150 pessoas</td></tr>
            <tr><td>Crianças</td><td>Até 9 anos não contam; 10+ contam</td></tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
