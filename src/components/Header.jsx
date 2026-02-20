import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="app-header">
        <div className="header-inner">
            <div className="header-left">
            <h1>Festa 15 Anos</h1>
            <p>Lorena · 28/06/2026</p>
          </div>
          <div className="header-center">
            <div className="header-avatar-wrap" onClick={() => setOpen(true)}>
              <img src="/lorena.jpeg" alt="Lorena" className="header-avatar" />
            </div>
          </div>
          <div className="header-right">
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
