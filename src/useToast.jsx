import { createContext, useContext, useState, useCallback, useRef } from 'react'

const ToastContext = createContext(null)

let nextId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef({})

  const remove = useCallback((id) => {
    clearTimeout(timers.current[id])
    delete timers.current[id]
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const add = useCallback((message, type = 'error', duration = 4000) => {
    const id = ++nextId
    setToasts(prev => [...prev, { id, message, type }])
    timers.current[id] = setTimeout(() => remove(id), duration)
  }, [remove])

  return (
    <ToastContext.Provider value={add}>
      {children}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map(t => (
            <div key={t.id} className={`toast toast-${t.type}`} onClick={() => remove(t.id)}>
              <span className="toast-icon">
                {t.type === 'error' ? '!' : t.type === 'success' ? '\u2713' : '!'}
              </span>
              <span className="toast-msg">{t.message}</span>
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const add = useContext(ToastContext)
  return {
    error:   (msg) => add(msg, 'error', 5000),
    success: (msg) => add(msg, 'success', 3000),
    warn:    (msg) => add(msg, 'warn', 4000),
  }
}
