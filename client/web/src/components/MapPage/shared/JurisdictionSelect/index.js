import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'
import * as select from 'store/selectors'
import { getStatesWithJurisdictions } from 'store/actions'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import useBreakpoints from 'hooks/useBreakpoints'
import SearchSelect from './SearchSelect'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '80px',
    backgroundColor: theme.palette.primary.main,
  },
  backButton: {
    color: '#FFFFFF',
  },
}))

// const useStylesLight = makeStyles((theme) => ({
//   root: {
//     backgroundColor: '#FFFFFF',
//   },
//   backButton: {
//     color: theme.palette.primary.main,
//   },
// }))

/*
  TODO:
    - Jurisdictions: fetch geojson with jdx data
    - Map: fit to jdx bounds after manual select
*/

const JurisdictionSelect = ({
  getStatesWithJurisdictions,
  statesWithJurisdictions,
  state,
  jurisdiction,
  onChange,
}) => {
  const classes = useStyles()
  // const classesLight = useLightStyles()
  const history = useHistory()
  const { isMobile } = useBreakpoints()
  const [selectedState, setSelectedState] = useState(state)
  const [selectedJurisdiction, setSelectedJurisdiction] = useState(jurisdiction)

  useEffect(() => {
    getStatesWithJurisdictions()
  }, [getStatesWithJurisdictions])

  useEffect(() => {
    if (state) setSelectedState(state)
    if (jurisdiction) setSelectedJurisdiction(jurisdiction)
  }, [state, jurisdiction])

  const handleStateChange = (state) => {
    setSelectedJurisdiction(null)
    setSelectedState(state)
  }

  const handleJurisdictionChange = (jurisdiction) => {
    setSelectedJurisdiction(jurisdiction)
    onChange()
    if (jurisdiction) {
      const { id } = jurisdiction
      const query = queryString.stringify({ jid: id })
      history.push(`/map?${query}`)
    }
  }

  return (
    <div className={classes.root}>
      {isMobile ? (
        <>
          <IconButton size="small" aria-label="close" onClick={onChange}>
            <ArrowBackIcon className={classes.backButton} />
          </IconButton>
          <SearchSelect
            placeholderText="Choose state"
            options={statesWithJurisdictions || []}
            selected={selectedState}
            onChange={handleStateChange}
            disabled={!statesWithJurisdictions}
            width={75}
            getOptionLabel={(option) => option?.abbreviation}
            outline="outlined"
            disableClearable
            isMobile
          />
          <SearchSelect
            placeholderText="Choose jurisdiction"
            options={
              (selectedState &&
                statesWithJurisdictions &&
                statesWithJurisdictions.find(
                  (state) => state.id === selectedState.id
                ).jurisdictions) ||
              []
            }
            selected={selectedJurisdiction}
            onChange={handleJurisdictionChange}
            disabled={!selectedState}
            width={235}
            getOptionLabel={(option) => option?.name}
            outline="outlined"
            disableClearable
            isMobile
          />
        </>
      ) : (
        <>
          <SearchSelect
            placeholderText="Choose your state"
            options={statesWithJurisdictions || []}
            selected={selectedState}
            onChange={handleStateChange}
            disabled={!statesWithJurisdictions}
            width={280}
            getOptionLabel={(option) => option?.name}
            outline="standard"
          />
          <SearchSelect
            placeholderText="Choose your jurisdiction"
            options={
              (selectedState &&
                statesWithJurisdictions &&
                statesWithJurisdictions.find(
                  (state) => state.id === selectedState.id
                ).jurisdictions) ||
              []
            }
            selected={selectedJurisdiction}
            onChange={handleJurisdictionChange}
            disabled={!selectedState}
            width={340}
            getOptionLabel={(option) => option?.name}
            outline="standard"
          />
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  statesWithJurisdictions: select.statesWithJurisdictions(state),
  state: select.state(state),
  jurisdiction: select.jurisdiction(state),
})

const mapDispatchToProps = (dispatch) => ({
  getStatesWithJurisdictions: () => dispatch(getStatesWithJurisdictions()),
})

export default connect(mapStateToProps, mapDispatchToProps)(JurisdictionSelect)

JurisdictionSelect.propTypes = {
  getStatesWithJurisdictions: PropTypes.func.isRequired,
  statesWithJurisdictions: PropTypes.arrayOf(PropTypes.shape({})),
  state: PropTypes.shape({}),
  jurisdiction: PropTypes.shape({}),
  onChange: PropTypes.func,
}

JurisdictionSelect.defaultProps = {
  statesWithJurisdictions: [],
  state: null,
  jurisdiction: null,
  onChange: () => {},
}
