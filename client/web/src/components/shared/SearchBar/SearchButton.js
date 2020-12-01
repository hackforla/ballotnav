import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
  root: {
    border: `1px ${theme.palette.primary.main} solid`,
    borderRadius: 40,
    backgroundColor: '#FFF',
    fontSize: 16,
    cursor: 'pointer',
    color: theme.palette.grey[600],
    padding: '6px 10px',
    height: 50,
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginRight: 10,
  },
}))

const SearchButton = ({ onClick }) => {
  const classes = useStyles()
  return (
    <div className={classes.root} onClick={onClick}>
      <SearchIcon
        color="primary"
        fontSize="large"
        className={classes.button}
      />
      Enter an address or ZIP
    </div>
  )
}

export default SearchButton
