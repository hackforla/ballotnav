import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import AddIcon from '@material-ui/icons/AddCircle'

const AddButton = ({ to }) => {
  const { url } = useRouteMatch()
  return (
    <Link to={`${url}/${to}`}>
      <AddIcon color='primary' style={{ fontSize: 32, display: 'block' }} />
    </Link>
  )
}

export default AddButton
