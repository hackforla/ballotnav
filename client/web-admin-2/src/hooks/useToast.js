import React, { useState, useContext, createContext, useCallback } from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const toastContext = createContext()

const defaultConfig = {
  message: null,
  severity: 'success', // success, warning, info, error
  autoHideDuration: null,
  anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
}

export function ToastProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [config, setConfig] = useState(defaultConfig)

  const toast = useCallback(config => {
    setOpen(true)
    setConfig({ ...defaultConfig, ...config })
  }, [])

  const handleClose = (event, reason) => {
   if (reason === 'clickaway') return
   setOpen(false)
 }

  return (
    <>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={config.anchorOrigin}
        autoHideDuration={config.autoHideDuration}
      >
        <Alert
          severity={config.severity}
          elevation={6}
          variant='filled'
          onClose={handleClose}
        >
          { config.message }
        </Alert>
      </Snackbar>
      <toastContext.Provider value={toast}>
        {children}
      </toastContext.Provider>
    </>
  )
}

const useToast = () => {
  return useContext(toastContext)
}

export default useToast
