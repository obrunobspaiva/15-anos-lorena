const NAV_ITEMS = [
  { id: 'inicio',     icon: '🏠', label: 'Início' },
  { id: 'checklist',  icon: '✅', label: 'Checklist' },
  { id: 'cronograma', icon: '📅', label: 'Cronograma' },
  { id: 'lista',      icon: '👥', label: 'Lista' },
  { id: 'chat',       icon: '💬', label: 'Chat' },
]

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => { onTabChange(item.id); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
