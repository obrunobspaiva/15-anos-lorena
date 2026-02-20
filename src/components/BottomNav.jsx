import { Home, ListChecks, Clock, Users, MessageCircle } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'inicio',     Icon: Home,          label: 'Início' },
  { id: 'checklist',  Icon: ListChecks,    label: 'Checklist' },
  { id: 'cronograma', Icon: Clock,         label: 'Cronograma' },
  { id: 'lista',      Icon: Users,         label: 'Lista' },
  { id: 'chat',       Icon: MessageCircle, label: 'Chat' },
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
          <item.Icon size={20} strokeWidth={1.8} className="nav-icon-svg" />
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
