import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import TextButton from 'components/core/TextButton'
import useWipActions from 'store/actions/wip'
import { useRole } from 'store/selectors'
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
  const { isVolunteer } = useRole()
  const history = useHistory()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onClick = useCallback(async () => {
    setIsSubmitting(true)
    const submit = isVolunteer ? releaseWip : publishWip
    await submit(wipJurisdiction)
    setIsSubmitting(false)

    history.push('/jurisdictions')
    closeTab(wipJurisdiction.jurisdictionId)
  }, [isVolunteer, publishWip, releaseWip, wipJurisdiction, history, closeTab])

  return (
    <div className={classes.root}>
      <PageWidth className={classes.inner}>
        <TextButton
          label={isVolunteer ? 'Submit For Review' : 'Publish'}
          size="xLarge"
          onClick={onClick}
          disabled={isVolunteer && wipJurisdiction.isReleased}
          isLoading={isSubmitting}
        />
      </PageWidth>
    </div>
  )
}

export default Footer
