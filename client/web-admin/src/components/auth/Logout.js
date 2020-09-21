import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { useHistory, withRouter } from 'react-router-dom'

LogoutButton.propTypes = {
  setUser: PropTypes.func,
  setToast: PropTypes.func,
}

export const logout = (setUser, setToast, history) => {
  sessionStorage.removeItem('token')
  setUser(null)
  setToast({ message: 'Logged out successfully.' })
}

function LogoutButton({ setUser, setToast }) {
  const history = useHistory()
  return (
    <Button onClick={() => logout(setUser, setToast, history)}>Logout</Button>
  )
}

export default withRouter(LogoutButton)
