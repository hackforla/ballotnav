import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const SelectButton = ({ to }) => {
  const { url } = useRouteMatch()
  return (
    <Link to={`${url}/${to}`}>
      <Button
        color='primary'
        variant='contained'
        style={{
          textTransform: 'none',
          fontWeight: 700,
          fontSize: 12,
          borderRadius: '1.5em',
          padding: '0.25em 3em'
        }}
      >
        Select
      </Button>
    </Link>
  )
}

export default SelectButton
