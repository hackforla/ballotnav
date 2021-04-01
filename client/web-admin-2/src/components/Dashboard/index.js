import React from 'react'
import { useAuth } from 'store/selectors'
import Volunteer from './Volunteer'
import Admin from './Admin'

const Dashboard = () => {
  const { user } = useAuth()

  switch (user.role) {
    case 'volunteer':
      return <Volunteer />
    case 'admin':
      return <Admin />
    default:
      throw new Error('invalid user role')
  }
}

export default Dashboard
