import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from './Accordion'
import { openModal } from 'store/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px 0 30px',
  },
}))

const CheckSteps = ({ openModal }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Accordion title='Check your steps'>
        <div onClick={() => openModal('verify')}>Check</div>
        <div onClick={() => openModal('register')}>Register</div>
        <div onClick={() => openModal('absentee')}>Absentee</div>
      </Accordion>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  openModal: (type) => dispatch(openModal('voteDotOrg', { type })),
})

export default connect(null, mapDispatchToProps)(CheckSteps)
