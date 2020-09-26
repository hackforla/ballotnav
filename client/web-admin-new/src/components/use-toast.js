import React, { useState, useContext, createContext, useCallback } from 'react'

const toastContext = createContext()

export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null)

  const toast = useCallback(({ message }) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }, [])

  return (
    <>
      {message && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'black',
            padding: 20,
            borderRadius: 5,
            color: 'white',
          }}>
          { message }
        </div>
      )}
      <toastContext.Provider value={toast}>
        {children}
      </toastContext.Provider>
    </>
  )
}

export const useToast = () => {
  return useContext(toastContext)
}
