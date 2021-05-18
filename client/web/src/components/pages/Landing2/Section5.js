import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import JoinUsHero from 'assets/images/join-us-hero.svg'
import useBreakpoints from 'hooks/useBreakpoints'

const useStyles = makeStyles((theme) => ({
    root: {
        // outline: '3px green solid',
        height: 350,
        marginTop: '10em',
        display: 'flex'
    },
    left: {
        width: ({ isDesktop }) => isDesktop ? '52%' : '100%',
        height: '100%',
        paddingRight: '1em',
        display: 'flex',
        flexDirection: 'column',
    },
    right: {
        width: '48%',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    heading: {
        fontWeight: 700,
        fontSize: 58,
        lineHeight: '65px',
    },
    message: {
        marginTop: '2em',
        fontWeight: 400,
        fontSize: 24,
        lineHeight: '32px',
    },
    button: {
        marginTop: '4em',
        borderRadius: '2em',
        padding: '1em 3em',
        fontWeight: 700,
        textTransform: 'none',
        fontSize: 14,
        alignSelf: ({ isDesktop }) => isDesktop ? 'flex-start' : 'center',
    },
    hero: {
        width: '85%',
    },
}))

const Section5 = () => {
    const { isDesktop, isMobile } = useBreakpoints()
    const classes = useStyles({ isDesktop })

    return <div className={classes.root}>
        <div className={classes.left}>
            <h1 className={classes.heading}>
                Join Us
        </h1>
            <p className={classes.message}>
                Can you design, write, or code?  Are you an activist with an idea?
                You can help Los Angeles live up to its potential at <strong><u>Hack for LA.</u></strong> Everyone is welcome!
        </p>
            {isMobile && (
                <img className={classes.hero} src={JoinUsHero} alt="Join us icon" />
            )}
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
}

export default Section5
