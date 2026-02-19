import { useState } from 'react'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import TabInicio from './components/TabInicio'
import TabChecklist from './components/TabChecklist'
import TabCronograma from './components/TabCronograma'
import TabLista from './components/TabLista'

const TABS = {
  inicio:     <TabInicio />,
  checklist:  <TabChecklist />,
  cronograma: <TabCronograma />,
  lista:      <TabLista />,
}

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio')

  return (
    <>
      <Header />
      <main className="app-main">
        <div key={activeTab} className="tab-section active">
          {TABS[activeTab]}
        </div>
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  )
}
