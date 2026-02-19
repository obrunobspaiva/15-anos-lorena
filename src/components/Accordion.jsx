import { useState } from 'react'

export default function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="accordion">
      <button
        className={`accordion-btn ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        {title}
      </button>
      <div className={`accordion-body ${open ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  )
}
