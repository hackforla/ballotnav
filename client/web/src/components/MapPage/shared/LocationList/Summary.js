import React from 'react'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import useBreakpoints from 'hooks/useBreakpoints'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
  text: {
    fontWeight: 700,
    fontSize: 16,
    '& p': {
      marginBottom: 20,
    }
  },
  instructions: {
    fontWeight: 400,
    fontStyle: 'italic',
    fontSize: 14,
  },
}))

const Summary = ({ numLocations, stateAbbr, jurisdictionName }) => {
  const classes = useStyles()
  const { isMobile } = useBreakpoints()
  if (!jurisdictionName) {
    return (
      <div className={classes.root}>
        <div className={classes.text}>
          <p>
            We could not identify any drop-off locations in your area.
          </p>
          <p>
            Please note that&nbsp;
            <u>results are currently limited to Georgia</u>
            &nbsp;for the special election on January 5, 2021.
          </p>
          <p>
            If you'd like to search for drop-off locations in Georgia,
            please use the
            {isMobile ? ' search button ' : ' address bar or dropdown '}
            above.
          </p>
        </div>
      </div>
    )
  }

  const word = numLocations === 1 ? 'location' : 'locations'
  return (
    <div className={classes.root}>
      <div className={classes.text}>
        {numLocations} known drop off {word}
        &nbsp;in{' '}
        <b>
          {jurisdictionName}, {stateAbbr}
        </b>
      </div>
      {/*<div className={classes.instructions}>
        Select a location to view rules, hours and directions
      </div>*/}
    </div>
  )
}

const mapStateToProps = (state) => ({
  numLocations: select.sortedLocations(state).length,
  stateAbbr: select.state(state)?.abbreviation,
  jurisdictionName: select.jurisdiction(state)?.name,
})

export default connect(mapStateToProps)(Summary)

Summary.propTypes = {
  numLocations: PropTypes.number.isRequired,
  stateAbbr: PropTypes.string,
  jurisdictionName: PropTypes.string,
}

Summary.defaultProps = {
  stateAbbr: undefined,
  jurisdictionName: undefined,
}
