import { useState, useEffect } from 'react'
import { EVENTO } from '../data'

export default function Countdown() {
  const [time, setTime] = useState(calcTime())

  function calcTime() {
    const now = new Date()
    const target = EVENTO.data
    if (target - now <= 0) return null

    let months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth())
    const tempDate = new Date(now)
    tempDate.setMonth(tempDate.getMonth() + months)
    if (tempDate > target) months--

    const afterMonths = new Date(now)
    afterMonths.setMonth(afterMonths.getMonth() + months)
    const diff = target - afterMonths

    return {
      months,
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
    return (
      <div className="countdown-card">
        <p className="countdown-today">🎉 Hoje é o grande dia!</p>
      </div>
    )
  }

  const boxes = [
    { num: time.months,                          unit: 'meses' },
    { num: time.days,                            unit: 'dias' },
    { num: String(time.hours).padStart(2, '0'),  unit: 'horas' },
    { num: String(time.mins).padStart(2, '0'),   unit: 'min' },
    { num: String(time.secs).padStart(2, '0'),   unit: 'seg' },
  ]

  return (
    <div className="countdown-card">
      <p className="countdown-label">🌸 Faltam</p>
      <div className="countdown-wrap">
        {boxes.map((b, i) => (
          <div key={b.unit} className="countdown-slot">
            <div className={`countdown-box ${b.unit === 'seg' ? 'countdown-box-pulse' : ''}`}>
              <span className="countdown-num">{b.num}</span>
            </div>
            <span className="countdown-unit">{b.unit}</span>
            {i < boxes.length - 1 && <span className="countdown-sep">:</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
