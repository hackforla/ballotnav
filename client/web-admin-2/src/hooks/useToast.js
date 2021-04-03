/*
NOTE: the toast function can be invoked in two ways:

  1. in an action creator
    import { toast } from 'store/actions/toaster'
    ...
    dispatch(toast(config))

  2. in a component
    import { useToast } from 'hooks/useToast'
    ...
    const toast = useToast()
    toast(config)

  Either way, an action is dispatched and the config ends up in the store.
*/

import React, {
  useState,
  useContext,
  createContext,
  useCallback,
  useEffect,
  useMemo
} from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useDispatch } from 'react-redux'
import { useToaster } from 'store/selectors'
import { toast } from 'store/actions/toaster'

const toastContext = createContext()

const defaultConfig = {
  message: null,
  severity: 'success', // success, warning, info, error
  autoHideDuration: 5000,
  anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
}

export function ToastProvider({ children }) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const selectedConfig = useToaster()

  useEffect(() => {
    if (selectedConfig) setOpen(true)
  }, [selectedConfig])

  const doToast = useCallback((config) => {
    dispatch(toast(config))
  }, [dispatch])

  const handleClose = useCallback((event, reason) => {
   if (reason === 'clickaway') return
   setOpen(false)
 }, [])

 const config = useMemo(() => ({
   ...defaultConfig,
   ...selectedConfig
 }), [selectedConfig])

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
      <toastContext.Provider value={doToast}>
        {children}
      </toastContext.Provider>
    </>
  )
}

const useToast = () => {
  return useContext(toastContext)
}

export default useToast
