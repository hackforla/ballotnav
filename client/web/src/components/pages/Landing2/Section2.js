import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MapHero from 'assets/images/sectionTwoA.svg'
import VoterHero from 'assets/images/sectionTwoB.svg'
import useBreakpoints from 'hooks/useBreakpoints'


const useStyles = makeStyles((theme) => ({
    root: {
        outline: '3px green solid',
        height: 550,
        marginTop: '10em',
    },
    top: {
        width: '100%'
    },
    left: {
        width: ({ isDesktop }) => isDesktop ? '58%' : '100%',
        height: '100%',
        paddingRight: '1em',
        display: 'flex',
        flexDirection: 'column',
    },
    right: {
        width: '42%',
        height: '100%',
    },
    heading: {
        fontWeight: 700,
        fontSize: 39,
        lineHeight: '45px',
    },
    message: {
        marginTop: '1em',
        fontWeight: 400,
        fontSize: 24,
        lineHeight: '33px',
        marginBottom: '1em'
    },
    subMessage: {
        marginTop: '4em',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '23.58px',
    },
    hero: {
        width: '100%',
        marginTop: '3em',
    },

}))

const Section2 = () => {
    const { isDesktop, isMobile } = useBreakpoints()
    const classes = useStyles({ isDesktop })

    return (
        <div className={classes.root}>
            <div className={classes.top}>
                <h1 className={classes.heading}>What is BallotNav?</h1>
                <p className={classes.message}>
                    BallotNav is a navigation tool created by Hack for LA that aims to
        prevent disenfranchisement by providing reliable and <strong>up-to-date
        information on ballot drop off locations across the US.</strong>
                </p>
            </div>
            <div className={classes.left}>
                <p className={classes.subMessage}>
                    Due to distrust in the postal service, misguided information from the
                    media, an inconsistent pool of resources provided by the government, and
                    societal shifts caused by COVID-19, it is now more important than ever
        to have useful <br /> resources for those hoping to have their voices heard.{' '}
                </p>
                <p className={classes.subMessage}>
                    Information is scattered across state and county websites, each of which
                    may individually fail to provide one or more elements of crucial
        information, such as available ballot drop-off times. <strong>The BallotNav
        project will collect this data <br /> through a network of brigade partnerships
        and update it accordingly <br /> leading up to mid-term elections in 2022.</strong>
                </p>
                {/* {isMobile && (
                    <img className={classes.hero} src={MapHero} />
                )} */}
            </div>
            {isDesktop && (
                <div className={classes.right}>
                    {/* <img className={classes.hero} src={MapHero} />
          <img className={classes.hero} src={VoterHero} /> */}
                </div>
            )}

        </div>
    )
}

export default Section2
