import React from 'react'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { makeStyles } from '@material-ui/core'
import Summary from './Summary'
import Cards from './Cards'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles({
  loader: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    position: 'absolute',
    width: '100%',
    top: 0,
    bottom: 0,
    left: 0,
    overflow: 'auto',
    padding: '10px 15px',
  },
})

const ListView = ({ isLoading }) => {
  const classes = useStyles()
  if (isLoading)
    return (
      <div className={classes.loader}>
        <CircularProgress />
      </div>
    )
  return (
    <div className={classes.list}>
      <Summary />
      <Cards />
    </div>
  )
}

const mapStateToProps = (state) => ({
  isLoading: select.isLoading(state),
})

export default connect(mapStateToProps)(ListView)
