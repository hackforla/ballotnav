import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectLocation } from 'store/actions'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import Typography from '@material-ui/core/Typography'

const BackButton = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      margin: '10px 0',
      userSelect: 'none',
    }}
  >
    <KeyboardBackspaceIcon color="primary" />
    <Typography
      style={{
        fontWeight: 'bold',
        paddingLeft: 10,
      }}
      color="primary"
    >
      Back to the results
    </Typography>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(selectLocation(null)),
})

export default connect(null, mapDispatchToProps)(BackButton)

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}
