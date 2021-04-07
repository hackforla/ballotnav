import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import useWipActions from 'store/actions/wip'
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
  const { releaseWip } = useWipActions()

  return (
    <div className={classes.root}>
      <PageWidth className={classes.inner}>
        <Button
          color="primary"
          variant="contained"
          onClick={releaseWip.bind(null, wipJurisdiction)}
          disabled={wipJurisdiction.isReleased}
          style={{
            fontWeight: 700,
            fontSize: 14,
            borderRadius: '2em',
            padding: '1em 3em',
          }}
        >
          Submit For Review
        </Button>
      </PageWidth>
    </div>
  )
}

export default Footer
