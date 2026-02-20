export default function Header() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="header-title">
          <div className="header-avatar-wrap">
            <img src="/lorena.jpeg" alt="Lorena" className="header-avatar" />
          </div>
          <div>
            <h1>Festa 15 Anos</h1>
            <p>Lorena · 28/06/2026</p>
          </div>
          <span className="header-icon">✦</span>
        </div>
      </div>
    </header>
  )
}
