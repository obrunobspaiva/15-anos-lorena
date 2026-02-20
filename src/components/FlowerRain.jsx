const FLOWERS = [
  { left:  '4%', delay: '0s',   dur:  '8s', size: '1.3rem' },
  { left: '12%', delay: '2.1s', dur: '10s', size: '0.9rem' },
  { left: '21%', delay: '4.4s', dur:  '7s', size: '1.5rem' },
  { left: '30%', delay: '1.2s', dur:  '9s', size: '0.8rem' },
  { left: '39%', delay: '5.7s', dur:  '8s', size: '1.1rem' },
  { left: '48%', delay: '3.0s', dur: '11s', size: '1.4rem' },
  { left: '57%', delay: '0.6s', dur:  '9s', size: '0.9rem' },
  { left: '65%', delay: '6.2s', dur:  '7s', size: '1.2rem' },
  { left: '73%', delay: '1.8s', dur: '10s', size: '1.0rem' },
  { left: '81%', delay: '4.0s', dur:  '8s', size: '0.85rem'},
  { left: '89%', delay: '2.6s', dur:  '9s', size: '1.3rem' },
  { left: '95%', delay: '7.0s', dur:  '7s', size: '1.0rem' },
  { left:  '8%', delay: '8.5s', dur: '10s', size: '0.9rem' },
  { left: '44%', delay: '9.0s', dur:  '8s', size: '1.1rem' },
  { left: '77%', delay: '5.5s', dur: '11s', size: '0.85rem'},
]

export default function FlowerRain() {
  return (
    <div className="flower-rain" aria-hidden="true">
      {FLOWERS.map((f, i) => (
        <span
          key={i}
          className="flower"
          style={{
            left: f.left,
            animationDelay: f.delay,
            animationDuration: f.dur,
            fontSize: f.size,
          }}
        >
          🌸
        </span>
      ))}
    </div>
  )
}
