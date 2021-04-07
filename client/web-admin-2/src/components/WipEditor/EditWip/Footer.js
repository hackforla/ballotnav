import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import useWipActions from 'store/actions/wip'
import { useAuth } from 'store/selectors'
import PageWidth from 'components/core/PageWidth'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#EBF3FA',
    display: 'flex',
    justifyContent: 'center',
  },
  inner: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '1em 0',
  },
}))

const Footer = ({ wipJurisdiction }) => {
  const classes = useStyles()
  const { releaseWip, publishWip, closeTab } = useWipActions()
  const { user } = useAuth()
  const isVolunteer = user.role === 'volunteer'
  const history = useHistory()

  const onClick = useCallback(async () => {
    if (isVolunteer)
      return releaseWip(wipJurisdiction)

    await publishWip(wipJurisdiction)
    history.push('/jurisdictions')
    closeTab(wipJurisdiction.jurisdictionId)
  }, [isVolunteer, publishWip, releaseWip, wipJurisdiction, history, closeTab])

  return (
    <div className={classes.root}>
      <PageWidth className={classes.inner}>
        <Button
          color="primary"
          variant="contained"
          onClick={onClick}
          disabled={isVolunteer && wipJurisdiction.isReleased}
          style={{
            fontWeight: 700,
            fontSize: 14,
            borderRadius: '2em',
            padding: '1em 3em',
          }}
        >
          { isVolunteer ? 'Submit For Review' : 'Publish' }
        </Button>
      </PageWidth>
    </div>
  )
}

export default Footer
