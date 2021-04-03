import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const EditButton = ({ id }) => {
  const { pathname } = useLocation()
  return (
    <Link to={`${pathname}/location/${id}`}>
      <Button
        color='primary'
        variant='outlined'
        style={{
          textTransform: 'none',
          fontWeight: 700,
          fontSize: 12,
          borderRadius: '1.5em',
          padding: '0.25em 3em'
        }}
      >
        Edit
      </Button>
    </Link>
  )
}

export default EditButton
