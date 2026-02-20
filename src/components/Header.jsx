import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="app-header">
        <div className="header-inner">
            <div className="header-title">
            <div className="header-avatar-wrap" onClick={() => setOpen(true)}>
              <img src="/lorena.jpeg" alt="Lorena" className="header-avatar" />
            </div>
            <div>
              <h1>Festa 15 Anos</h1>
              <p className="header-name">Lorena</p>
            </div>
            <span className="header-icon">✦</span>
          </div>
        </div>
      </header>

      {open && (
        <div className="photo-modal-overlay" onClick={() => setOpen(false)}>
          <img src="/lorena.jpeg" alt="Lorena" className="photo-modal-img" />
        </div>
      )}
    </>
  )
}
