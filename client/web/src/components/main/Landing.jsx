import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import RoomIcon from '@material-ui/icons/Room';
import TextsmsIcon from '@material-ui/icons/Textsms';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {ReactComponent as HeroImage} from 'assets/hero-image.svg'
import {ReactComponent as DesktopMobileImage} from 'assets/desktop-mobile-image.svg'
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
        left: '50%',
        top: -100
    },
    mainTextOuter: {
        position: 'relative',
        paddingTop: '5rem'
    },
    mainTextInner: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingLeft: 15,
        paddingTop: 155,
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
        fontSize: 33,
        fontWeight: 700,
        lineHeight: '26px',
        marginTop: 30,
        lineHeight: 1
    },
    h5: {
        color: theme.palette.primary.main,
        fontSize: 22,
        fontWeight: 1000,
        lineHeight: '26px',
        marginTop: 30,
        lineHeight: 1.3
    },
    p: {
        marginTop: '2rem'
    },
    a: {
        marginTop: '0.5rem'
    },
    cta: {
        marginTop: '2rem',
        borderRadius: '2rem',
        fontWeight: 700,
        fontSize: 18
    },
    search: {
        width: 450,
        marginTop: 10
    },
    appDescription: {
        paddingTop: 15
    }
}))(({classes}) => (
    <div className={classes.root}>
        <div className={classes.wrapper}>
            <div className={classes.mainTextOuter}>
                <HeroImage className={classes.hero}/>
                <div className={classes.mainTextInner}>
                    <h2 className={classes.h2}>Find your drop off locations</h2>
                    <h3 className={classes.h3}>
                        Find safe, secure, in-person locations to
                        <br/>
                        drop off your mail-in or absentee ballot
                    </h3>
                    <h4 className={classes.h4}>
                        There are no current elections <br/> at the moment
                        <br/>
                    </h4>
                    <h5 className={classes.h5}>
                        You can navigate the demo and see how the website works <br /> when election are in
                        place.
                        <br/>
                    </h5>
                    <Button style={{borderRadius: '40px', padding: '16px 40px'}} className={classes.cta} variant="contained" color="primary">
                        Launch the Demo
                    </Button>
                </div>
            </div>
            <section className={classes.appDescription}>
                <Grid container>
                    <Grid item xs={6}>
                        <DesktopMobileImage/>
                    </Grid>
                    <Grid container item xs={6} spacing={3}>
                        <Grid item xs={12}>
                            <h2
                                style={{
                                color: '#1B2152',
                                fontWeight: 'bold',
                                marginTop: 0,
                                fontSize: 33
                            }}
                                className={classes.h2}>Desktop and Mobile Compatible</h2>
                            <p style={{fontSize: '1.3rem', color: '#041B54'}} className={classes.p}>Navigate through the app</p>
                        </Grid>
                        <Grid container>
                            <Grid style={{padding: '1rem'}} item xs={4}>
                                <RoomIcon style={{color: '#041B54'}}/>
                                <p style={{color: '#1B2152', fontSize: 14}}>Search the drop off locations and see details and direction</p>
                            </Grid>
                            <Grid style={{padding: '1rem'}} item xs={4}>
                                <TextsmsIcon style={{color: '#041B54'}}/>     
                                <p style={{color: '#1B2152', fontSize: 14}}>Receive notifications on your phone</p>
                            </Grid>
                            <Grid style={{padding: '1rem'}} item xs={4}>
                                <CheckCircleIcon style={{color: '#041B54'}}/>
                                <p style={{color: '#1B2152', fontSize: 14}}>Check the steps before you go!</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </section>
        </div>
    </div>
))

export default Landing