import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import * as select from 'store/selectors'
import { closeModal } from 'store/actions/modals'
import SearchBar from 'components/shared/SearchBar'
import JurisdictionSelect from 'components/MapPage/shared/JurisdictionSelect'

const useStyles = makeStyles((theme) => ({
  main: {},
  address: {
    position: 'relative',
    padding: '15px 6px',
    '& .mapboxgl-ctrl-geocoder--icon-search': {
      display: 'none',
    },
    '& .mapboxgl-ctrl-geocoder--input': {},
  },
  backButton: {
    position: 'absolute',
    //top: '50%',
    top: 40,
    transform: 'translateY(-50%)',
    left: 15,
    zIndex: 20,
  },
  jurisdiction: {
    paddingTop: 15,
  },
  tabs: {
    display: 'flex',
    marginTop: 8,
  },
  tab: {
    width: '50%',
    textAlign: 'center',
    padding: 5,
    fontWeight: 700,
    color: 'grey',
    cursor: 'pointer',
  },
  active: {
    borderBottom: `2px ${theme.palette.primary.main} solid`,
    color: theme.palette.primary.main,
    cursor: 'default',
  },
}))

const SearchModal = ({ isOpen, close }) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState('address')

  useEffect(() => {
    switch (activeTab) {
      case 'address':
        const input = document.querySelector('.mapboxgl-ctrl-geocoder--input')
        if (!input) return

        if (isOpen) input.focus()
        else input.blur()

        break

      case 'jurisdiction':
        if (!isOpen) setActiveTab('address')
        break

      default:
        throw new Error('invalid tab')
    }
  }, [isOpen, activeTab])

  return (
    <Dialog fullScreen keepMounted open={isOpen}>
      <div className={classes.tabs}>
        <div
          className={clsx(classes.tab, {
            [classes.active]: activeTab === 'address',
          })}
          onClick={() => setActiveTab('address')}
        >
          Search by Address
        </div>
        <div
          className={clsx(classes.tab, {
            [classes.active]: activeTab === 'jurisdiction',
          })}
          onClick={() => setActiveTab('jurisdiction')}
        >
          Select Jurisdiction
        </div>
      </div>
      <div className={classes.main}>
        {(() => {
          switch (activeTab) {
            case 'address':
              // TODO: move back button into SearchBar with 'backButton' prop
              return (
                <div className={classes.address}>
                  <IconButton
                    size="small"
                    aria-label="close"
                    onClick={close}
                    className={classes.backButton}
                  >
                    <ArrowBackIcon color="primary" />
                  </IconButton>
                  <SearchBar onComplete={close} />
                </div>
              )
            case 'jurisdiction':
              return (
                <div className={classes.jurisdiction}>
                  <JurisdictionSelect onComplete={close} />
                </div>
              )
            default:
              return null
          }
        })()}
      </div>
    </Dialog>
  )
}

const mapStateToProps = (state) => ({
  isOpen: select.modals(state)['search'].isOpen,
  params: select.modals(state)['search'].params,
})

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(closeModal('search')),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal)
