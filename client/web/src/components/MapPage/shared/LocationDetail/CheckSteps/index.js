import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { openModal } from 'store/actions'
import Accordion from './Accordion'
import { ReactComponent as CheckCircleIcon } from 'assets/icons/check-circle.svg'
import { ReactComponent as ArrowForwardIcon } from 'assets/icons/arrow-forward.svg'

const Step = withStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkIcon: {
    marginRight: 10,
    width: 24,
    height: 24,
    flex: 0,
  },
  text: {
    color: theme.palette.primary.main,
  },
  forwardIcon: {
    marginLeft: 10,
  },
}))(({ children, onClick, classes }) => (
  <div className={classes.root}>
    <div className={classes.checkIcon}>
      <CheckCircleIcon />
    </div>
    <span className={classes.text}>{children}</span>
    {onClick && (
      <IconButton
        className={classes.forwardIcon}
        size="small"
        onClick={onClick}
      >
        <ArrowForwardIcon />
      </IconButton>
    )}
  </div>
))

const CheckSteps = ({ openModal }) => {
  return (
    <div style={{ margin: '20px 0' }}>
      <Accordion title="Check your steps">
        <Step onClick={openModal.bind(null, 'verify')}>
          Have you checked your registration?
        </Step>
        <Step onClick={openModal.bind(null, 'register')}>
          Do you need to register?
        </Step>
        <Step onClick={openModal.bind(null, 'absentee')}>
          Do you need to request a mail-in/absentee ballot? (Deadline to
          receive: Jan. 1, 2021)
        </Step>
        <Step>
          Before you go, have you checked for last-minute changes to voting
          rules and COVID-19 safety information for your State?
        </Step>
        <Step>
          Before you go, have you checked for last-minute changes at your chosen
          location?
        </Step>
      </Accordion>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  openModal: (type) => dispatch(openModal('voteDotOrg', { type })),
})

export default connect(null, mapDispatchToProps)(CheckSteps)
