import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'
import { makeStyles } from '@material-ui/core/styles'
import * as select from 'store/selectors'
import { getStatesWithJurisdictions } from 'store/actions'
import SearchSelect from './SearchSelect'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: '80px',
  },
}))

/*
  TODO:
    - Mobile: styles, TextField variant, state abbrevs, back button
    - Jurisdictions: fetch geojson with jdx data
    - Map: fit to jdx bounds after manual select
*/

const JurisdictionSelect = ({
  getStatesWithJurisdictions,
  statesWithJurisdictions,
  state,
  jurisdiction,
}) => {
  const classes = useStyles()
  const history = useHistory()
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
    if (jurisdiction) {
      const { id } = jurisdiction
      const query = queryString.stringify({ jid: id })
      history.push(`/map?${query}`)
    }
  }

  return (
    <div className={classes.root}>
      <SearchSelect
        placeholderText="Choose your state"
        options={statesWithJurisdictions || []}
        selected={selectedState}
        onChange={handleStateChange}
        disabled={!statesWithJurisdictions}
        width={280}
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
      />
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
}

JurisdictionSelect.defaultProps = {
  statesWithJurisdictions: [],
  state: null,
  jurisdiction: null,
}
