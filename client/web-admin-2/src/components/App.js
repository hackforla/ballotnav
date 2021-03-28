import React from 'react'
import { useAuth } from 'store/selectors'

const App = () => {
  const { user } = useAuth()
  return (
    <div>
      { JSON.stringify(user) }
    </div>
  )
}

export default App
