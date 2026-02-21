import { useApp } from '../AppContext'
import { TOTAL_CONTRATADO } from '../data'
import Tag from './Tag'

export default function TabFinanceiro() {
  const { teto, setTeto } = useApp()

  const tetoNum = parseFloat(teto.replace(/\./g, '').replace(',', '.'))
  const margem  = isNaN(tetoNum) ? null : tetoNum - TOTAL_CONTRATADO

  return (
    <>
      <div className="section-header">
        <h2>Controle Financeiro</h2>
        <span className="badge badge-gold">28/05/2026</span>
      </div>

      {/* CARDS RESUMO */}
      <div className="card finance-cards">
        <div className="finance-card fc-total">
          <span className="fc-label">Total Contratado</span>
          <span className="fc-value">R$ 42.502,50</span>
        </div>
        <div className="finance-card fc-pago">
          <span className="fc-label">Sinal Pago</span>
          <span className="fc-value">R$ 5.248,50</span>
        </div>
        <div className="finance-card fc-restante">
          <span className="fc-label">Restante a Pagar</span>
          <span className="fc-value">R$ 37.254,00</span>
        </div>
      </div>

      {/* CONTRATO ROSMARINO */}
      <div className="card">
        <h3 className="card-title">📜 Contrato Rosmarino (Buffet Principal)</h3>
        <p className="finance-item-value">
          R$ 34.990,00 <Tag type="success">CONTRATADO</Tag>
        </p>
        <p className="card-subtitle">Itens inclusos no pacote:</p>
        <ul className="included-list">
          {[
            'Buffet completo (Menu Rosmarino)',
            'Decoração floral de luxo',
            'DJ / Som / Iluminação',
            'Assessoria no dia',
            'Bolo e doces tradicionais',
            'Refrigerantes, água e sucos',
            'Staff completo (recepção, garçons, limpeza, segurança)',
            'Pista de dança',
            'Gelo seco',
            'Luz cênica',
            'Fogos indoor',
            'Bar Cairo',
            'Capela para cerimônia',
            '5h festa + 1h cerimônia',
            'Pacote Nice (foto + filmagem)',
          ].map(item => <li key={item}>✓ {item}</li>)}
        </ul>
      </div>

      {/* EXTRAS CONTRATADOS */}
      <div className="card">
        <h3 className="card-title">➕ Extras Contratados</h3>
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th>Item</th><th>Valor</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>Magic Mirror (5h ilimitado)</td><td>R$ 2.409,00</td><td><Tag type="success">CONT.</Tag></td></tr>
              <tr><td>Orquestra / Violinista</td><td>R$ 1.633,50</td><td><Tag type="success">CONT.</Tag></td></tr>
              <tr><td>Cerveja (300 latas Brahma DM)</td><td>R$ 2.670,00</td><td><Tag type="success">CONT.</Tag></td></tr>
              <tr>
                <td><strong>Subtotal extras</strong></td>
                <td><strong>R$ 6.712,50</strong></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* EM FORMALIZAÇÃO */}
      <div className="card">
        <h3 className="card-title">⚠️ Em Formalização</h3>
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th>Item</th><th>Valor</th><th>Status</th></tr></thead>
            <tbody>
              <tr>
                <td>Retrospectiva + Projetor</td>
                <td>R$ 800,00</td>
                <td><Tag type="warn">FORMALIZAR</Tag></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PENDENTES */}
      <div className="card">
        <h3 className="card-title">🛒 Pendentes (sem orçamento definido)</h3>
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th>Item</th><th>Estimativa</th><th>Prioridade</th></tr></thead>
            <tbody>
              {[
                { label: 'MC / Mestre de cerimônias',         prio: 'alta'  },
                { label: 'Maquiagem + cabelo + retoques',      prio: 'media' },
                { label: 'Vestidos debutante (3 looks)',       prio: 'alta'  },
                { label: 'Robô de LED',                        prio: 'alta',  estimativa: 'R$ 1.200–1.800' },
                { label: 'Lembrancinhas (Gloss + Doce)',       prio: 'media' },
                { label: 'Kit Balada',                         prio: 'media' },
                { label: 'Cartão QR — Galeria Digital',        prio: 'baixa', estimativa: 'R$ 80–150' },
                { label: 'Convites impressos',                 prio: 'media' },
                { label: 'Decoração floral adicional',         prio: 'baixa' },
              ].map(r => (
                <tr key={r.label}>
                  <td>{r.label}</td>
                  <td>{r.estimativa || 'A orçar'}</td>
                  <td>
                    <Tag type={r.prio === 'alta' ? 'danger' : r.prio === 'media' ? 'warn' : 'info'}>
                      {r.prio === 'alta' ? 'ALTA' : r.prio === 'media' ? 'MÉDIA' : 'BAIXA'}
                    </Tag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONTROLE DE PAGAMENTOS */}
      <div className="card">
        <h3 className="card-title">🏦 Controle de Pagamentos</h3>
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th>Descrição</th><th>Valor</th><th>Prazo</th><th>Status</th></tr></thead>
            <tbody>
              <tr>
                <td>Sinal (15%)</td>
                <td>R$ 5.248,50</td>
                <td>Pago</td>
                <td><Tag type="success">PAGO ✓</Tag></td>
              </tr>
              <tr>
                <td>Restante buffet</td>
                <td>R$ 29.741,50</td>
                <td>28/05/2026</td>
                <td><Tag type="danger">PENDENTE</Tag></td>
              </tr>
              <tr>
                <td>Extras contratados</td>
                <td>R$ 7.512,50</td>
                <td>28/05/2026</td>
                <td><Tag type="danger">PENDENTE</Tag></td>
              </tr>
              <tr>
                <td>Retrospectiva (se formal.)</td>
                <td>R$ 800,00</td>
                <td>A definir</td>
                <td><Tag type="warn">EM ANDAMENTO</Tag></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* TETO ORÇAMENTÁRIO */}
      <div className="card">
        <h3 className="card-title">🎯 Teto Orçamentário</h3>
        <p className="card-subtitle">
          Defina o orçamento máximo para orientar as contratações pendentes
        </p>
        <div className="budget-input-wrap">
          <span className="budget-prefix">R$</span>
          <input
            type="text"
            className="budget-input"
            placeholder="Ex: 55.000,00"
            inputMode="decimal"
            value={teto}
            onChange={e => setTeto(e.target.value)}
          />
        </div>
        {margem !== null && (
          <p
            className="teto-status"
            style={{ color: margem >= 0 ? 'var(--success)' : 'var(--danger)' }}
          >
            {margem >= 0
              ? `✓ Margem disponível: R$ ${margem.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
              : '⚠️ Valor abaixo do já contratado (R$ 42.502,50)!'}
          </p>
        )}
        <p className="note">Valor salvo automaticamente no dispositivo.</p>
      </div>
    </>
  )
}
