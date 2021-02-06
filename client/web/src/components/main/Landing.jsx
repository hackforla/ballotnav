import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core';
import {ReactComponent as HeroDesktop} from 'assets/hero-desktop.svg'

const Landing = withStyles((theme) => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    wrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: theme.layout.pageWidth,
        margin: '0 auto',
        width: '100%'
    },
    hero: {
        display: 'block',
        width: '84%',
        marginLeft: '12%',
        position: 'relative',
        left: '30%'
    },
    mainTextOuter: {
        position: 'relative'
    },
    mainTextInner: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingLeft: 15,
        paddingTop: 35,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    h2: {
        color: theme.palette.secondary.main,
        fontSize: 46,
        fontWeight: 700,
        marginBottom: 30
    },
    h3: {
        color: theme.palette.primary.main,
        fontSize: 24,
        fontWeight: 400,
        lineHeight: '32px'
    },
    h4: {
        color: theme.palette.primary.main,
        fontSize: 18,
        fontWeight: '900',
        lineHeight: '26px',
        marginTop: 30
    },
    h5: {
        color: theme.palette.primary.main,
        fontSize: 14,
        fontWeight: 1000,
        lineHeight: '26px',
        marginTop: 30
    },
    p: {
        marginTop: '2rem'
    },
    a: {
        marginTop: '0.5rem'
    }, 
    cta: {
      marginTop: '1rem',
      borderRadius: '2rem'
    },
    search: {
        width: 450,
        marginTop: 10
    }
}))(({classes}) => (
    <div className={classes.root}>
        <div className={classes.wrapper}>
            <div className={classes.mainTextOuter}>
                <HeroDesktop className={classes.hero}/>
                <div className={classes.mainTextInner}>
                    <h2 className={classes.h2}>Find your drop off locations</h2>
                    <h3 className={classes.h3}>
                        Find safe, secure, in-person locations to
                        <br/>
                        drop off your mail-in or absentee ballot
                    </h3>
                    <h4 className={classes.h4}>
                        There are no current elections at the moment
                        <br/>
                    </h4>
                    <h5 className={classes.h5}>
                        You can navigate the demo and see how the website works when election are in
                        place.
                        <br/>
                    </h5>
                    <Button className={classes.cta} variant="contained" color="primary">
                        Launch the Demo
                    </Button>
                    <p className={classes.p}>
                        Learn more about the project and how you can get involved
                    </p>
                    <a className={classes.a} href="#">Learn More About the Project</a>
                </div>
            </div>
            <section>
                
            </section>
        </div>
    </div>
))

export default Landing