const ITEMS = [
  { left:  '4%', delay:  '0.0s', dur:  '8s', size: '1.3rem', icon: '🌸' },
  { left: '12%', delay:  '2.1s', dur: '10s', size: '0.9rem', icon: '💗' },
  { left: '21%', delay:  '4.4s', dur:  '7s', size: '1.5rem', icon: '🌸' },
  { left: '30%', delay:  '1.2s', dur:  '9s', size: '0.8rem', icon: '💗' },
  { left: '39%', delay:  '5.7s', dur:  '8s', size: '1.1rem', icon: '🌸' },
  { left: '48%', delay:  '3.0s', dur: '11s', size: '1.4rem', icon: '💗' },
  { left: '57%', delay:  '0.6s', dur:  '9s', size: '0.9rem', icon: '🌸' },
  { left: '65%', delay:  '6.2s', dur:  '7s', size: '1.2rem', icon: '💗' },
  { left: '73%', delay:  '1.8s', dur: '10s', size: '1.0rem', icon: '🌸' },
  { left: '81%', delay:  '4.0s', dur:  '8s', size: '0.85rem',icon: '💗' },
  { left: '89%', delay:  '2.6s', dur:  '9s', size: '1.3rem', icon: '🌸' },
  { left: '95%', delay:  '7.0s', dur:  '7s', size: '1.0rem', icon: '💗' },
  { left:  '8%', delay:  '8.5s', dur: '10s', size: '0.9rem', icon: '💗' },
  { left: '44%', delay:  '9.0s', dur:  '8s', size: '1.1rem', icon: '🌸' },
  { left: '77%', delay:  '5.5s', dur: '11s', size: '0.85rem',icon: '💗' },
  { left: '17%', delay: '10.5s', dur:  '9s', size: '1.2rem', icon: '🌸' },
  { left: '55%', delay: '11.0s', dur:  '8s', size: '0.9rem', icon: '💗' },
  { left: '85%', delay:  '9.8s', dur: '10s', size: '1.1rem', icon: '🌸' },
]

export default function FlowerRain() {
  return (
    <div className="flower-rain" aria-hidden="true">
      {ITEMS.map((item, i) => (
        <span
          key={i}
          className="flower"
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.dur,
            fontSize: item.size,
          }}
        >
          {item.icon}
        </span>
      ))}
    </div>
  )
}
