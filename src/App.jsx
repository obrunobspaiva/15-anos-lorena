import { useState } from 'react'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import TabInicio from './components/TabInicio'
import TabChecklist from './components/TabChecklist'
import TabCronograma from './components/TabCronograma'
import TabLista from './components/TabLista'
import TabChat from './components/TabChat'

const STATIC_TABS = {
  checklist:  <TabChecklist />,
  cronograma: <TabCronograma />,
  lista:      <TabLista />,
  chat:       <TabChat />,
}

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio')

  const tabContent = activeTab === 'inicio'
    ? <TabInicio onTabChange={setActiveTab} />
    : STATIC_TABS[activeTab]

  return (
    <>
      <Header />
      <main className="app-main">
        <div key={activeTab} className="tab-section active">
          {tabContent}
        </div>
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  )
}
