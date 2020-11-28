import React from 'react'
import { connect } from 'react-redux'
import { openModal } from 'store/actions'
import * as select from 'store/selectors'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    height: 52,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px ${theme.palette.primary.main} solid`,
    paddingLeft: 5,
    paddingRight: 5,
  },
  title: {
    textAlign: 'center',
  },
  jurisdictionName: {
    color: theme.palette.primary.main,
    fontSize: 16,
    fontWeight: 700,
  },
  stateName: {
    color: theme.palette.primary.main,
    fontSize: 12,
    fontWeight: 400,
  },
}))

const Header = ({ openSearchModal, jurisdictionName, stateName }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <IconButton
        size="small"
        aria-label="search"
        onClick={openSearchModal}
      >
        <SearchIcon color="primary" fontSize="large" />
      </IconButton>
      <div className={classes.title}>
        {jurisdictionName && stateName && (
          <>
            <div className={classes.jurisdictionName}>
              { jurisdictionName }
            </div>
            <div className={classes.stateName}>
              { stateName }
            </div>
          </>
        )}
      </div>
      <IconButton
        size="small"
        aria-label="search"
      >
        <SearchIcon color="primary" fontSize="large" />
      </IconButton>
    </div>
  )
}

const mapStateToProps = (state) => ({
  jurisdictionName: select.jurisdiction(state)?.name,
  stateName: select.state(state)?.name,
})

const mapDispatchToProps = (dispatch) => ({
  openSearchModal: () => dispatch(openModal('search')),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
