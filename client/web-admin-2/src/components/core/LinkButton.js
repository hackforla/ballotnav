import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import TextButton from './TextButton'

const LinkButton = ({ to, disabled, ...rest }) => {
  const { url } = useRouteMatch()
  return (
    <Link
      to={`${url}/${to}`}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      <TextButton disabled={disabled} {...rest} />
    </Link>
  )
}

export default LinkButton
