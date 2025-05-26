import React, { createContext, useContext, useState } from "react"

const ToastContext = createContext()

export function Toaster({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = (toast) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, ...toast }])
    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      <div className="fixed top-0 right-0 z-50 p-4 space-y-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`p-4 rounded-lg shadow-lg ${
              t.variant === "destructive" ? "bg-red-600" : "bg-gray-800"
            } text-white`}
          >
            {t.title && <div className="font-bold">{t.title}</div>}
            {t.description && <div className="text-sm">{t.description}</div>}
          </div>
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  )
}

export const toast = (props) => {
  const context = useContext(ToastContext)
  if (context) {
    context.toast(props)
  }
}
