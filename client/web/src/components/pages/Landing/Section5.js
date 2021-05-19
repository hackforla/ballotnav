import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import JoinUsHero from 'assets/images/join-us-hero.svg'
import useBreakpoints from 'hooks/useBreakpoints'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: ({ isDesktop }) => (isDesktop ? '8rem' : '2em'),
    display: 'flex',
  },
  left: {
    width: ({ isDesktop }) => (isDesktop ? '55%' : '100%'),
    padding: '2em 0',
    display: 'flex',
    flexDirection: 'column',
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  heading: {
    fontWeight: 700,
    fontSize: 48,
  },
  message: {
    marginTop: '2em',
    fontWeight: 400,
    fontSize: 20,
    lineHeight: '27px',
  },
  button: {
    marginTop: ({ isDesktop }) => (isDesktop ? '4em' : '2em'),
    marginBottom: ({ isDesktop }) => (isDesktop ? 0 : '4em'),
    borderRadius: '2em',
    padding: '1em 3em',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: 14,
    alignSelf: ({ isDesktop }) => (isDesktop ? 'flex-start' : 'center'),
  },
}))

const Section5 = () => {
  const { isDesktop } = useBreakpoints()
  const classes = useStyles({ isDesktop })

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <h1 className={classes.heading}>Join Us</h1>
        <p className={classes.message}>
          Can you design, write, or code? Are you an activist with an idea? You
          can help Los Angeles live up to its potential at{' '}
          <strong>
            <u>
              <a href="https://www.hackforla.org/">Hack for LA.</a>
            </u>
          </strong>{' '}
          Everyone is welcome!
        </p>

        <Button
          className={classes.button}
          color="primary"
          variant="outlined"
          href="https://www.hackforla.org/projects/ballot-nav"
        >
          Meet the team
        </Button>
      </div>
      {isDesktop && (
        <div className={classes.right}>
          <img className={classes.hero} src={JoinUsHero} alt="Join us icon" />
        </div>
      )}
    </div>
  )
}

export default Section5
