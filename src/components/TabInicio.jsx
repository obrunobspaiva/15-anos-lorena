import Countdown from './Countdown'

export default function TabInicio() {
  return (
    <>
    {/* COUNTDOWN */}
      <div className="card">
        <h3 className="card-title">📅 Contagem Regressiva</h3>
        <Countdown />
      </div>

      {/* DADOS DO EVENTO */}
      <div className="card">
        <h3 className="card-title">📋 Dados do Evento</h3>
        <table className="info-table">
          <tbody>
            <tr><td>Data</td><td><strong>28/06/2026 (domingo)</strong></td></tr>
            <tr><td>Horário</td><td>19:00 às 01:00 (6 horas)</td></tr>
            <tr><td>Local</td><td>Mansão Adélia Prado, SP</td></tr>
            <tr>
              <td>Endereço</td>
              <td>
                <span style={{ display: 'block', marginBottom: 6, fontSize: '0.8rem' }}>
                  Av. Alcântara Machado, 1705 — Mooca, SP
                </span>
                <span style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  <a
                    href="https://waze.com/ul?q=Av.+Alcântara+Machado,+1705+Mooca+São+Paulo+SP"
                    target="_blank" rel="noopener noreferrer"
                    className="map-btn map-btn-waze"
                  >
                    🚗 Waze
                  </a>
                  <a
                    href="https://maps.google.com/?q=Av.+Alcântara+Machado,+1705,+Mooca,+São+Paulo,+SP,+03101-005"
                    target="_blank" rel="noopener noreferrer"
                    className="map-btn map-btn-gmaps"
                  >
                    📍 Google Maps
                  </a>
                </span>
              </td>
            </tr>
            <tr>
              <td>Instagram</td>
              <td>
                <a
                  href="https://www.instagram.com/mansaoadeliaprado/"
                  target="_blank" rel="noopener noreferrer"
                  className="map-btn map-btn-insta"
                >
                  📸 @mansaoadeliaprado
                </a>
              </td>
            </tr>
            <tr><td>Crianças</td><td>Até 9 anos não contam; 10+ contam</td></tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
