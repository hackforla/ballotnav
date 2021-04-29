import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    maxWidth: '58%',
    marginTop: 75,
    color: '#1B2152',
    fontSize: 30,
    // backgroundColor: 'green',
    // color: props => props.color,
  },
})

const SubHeadSecTwo = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <p>
        BallotNav is a navigation tool created by Hack for LA that aims to
        prevent disenfranchisement by providing reliable and up-to-date
        information on ballot drop off locations across the US.
      </p>
    </div>
  )
}

export default SubHeadSecTwo
