import { useState, useEffect } from 'react'
import { EVENTO } from '../data'

export default function Countdown() {
  const [time, setTime] = useState(calcTime())

  function calcTime() {
    const diff = EVENTO.data - new Date()
    if (diff <= 0) return null
    return {
      days:  Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      mins:  Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      secs:  Math.floor((diff % (1000 * 60)) / 1000),
    }
  }

  useEffect(() => {
    const id = setInterval(() => setTime(calcTime()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!time) {
    return <p style={{ fontWeight: 700, color: 'var(--wine)', textAlign: 'center' }}>🎉 Hoje é o grande dia!</p>
  }

  const boxes = [
    { num: time.days,                         unit: 'Dias' },
    { num: String(time.hours).padStart(2,'0'), unit: 'Horas' },
    { num: String(time.mins).padStart(2,'0'),  unit: 'Min' },
    { num: String(time.secs).padStart(2,'0'),  unit: 'Seg' },
  ]

  return (
    <div className="countdown-wrap">
      {boxes.map(b => (
        <div key={b.unit} className="countdown-box">
          <span className="countdown-num">{b.num}</span>
          <span className="countdown-unit">{b.unit}</span>
        </div>
      ))}
    </div>
  )
}
