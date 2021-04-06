import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  input: {
    flex: 1,
    color: theme.palette.primary.main,
    fontSize: '1em',
    border: 'none',
    outline: 'none',
  },
}))

const Search = ({ value, onChange, placeholder }) => {
  const classes = useStyles()

  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return (
    <div className={classes.root}>
      <input
        className={classes.input}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <SearchIcon color="primary" style={{ fontSize: 28 }} />
    </div>
  )
}

export default Search
