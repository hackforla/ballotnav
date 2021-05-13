import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BallotNavThumbnail from 'assets/images/ballotNavThumbnail.svg'
import AccuracyIcon from 'assets/features/check.svg'
import LocationIcon from 'assets/features/current-location.svg'
import TextIcon from 'assets/features/message-ellipsis.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '2em',
    },
    top: {
        display: 'flex',
        alignItems: 'center'
    },
    hero: {
        width: '98%',
        marginTop: '1rem',
        position: 'relative',
        right: '5%'
    },
    left: {
        width: '60%',
        height: '60%'
    },
    right: {
        width: '48%',
        height: '60%',
        display: 'flex',
        flexDirection: 'column',

    },
    bottom: {
        display: 'flex',
        // justifyContent: 'space-between'
    },
    bottomIcons: {
        marginTop: '5rem',
        marginBottom: '6rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        "& img": {
            marginRight: '1em'
        }
    },
    iconSize: {
        // width: '14rem',
        height: '8.66rem'
    },
    heading: {
        fontWeight: 700,
        fontSize: 48,
        lineHeight: '75px',
    },
    message: {
        marginTop: '1em',
        fontWeight: 400,
        fontSize: 26,
        lineHeight: '37px',
    },
    subMessage: {
        marginLeft: '1rem',
        marginRight: '1rem',
        fontWeight: 400,
        fontSize: 22,
        lineHeight: '32px',
    }



}))

const Section3 = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.top}>
                <div className={classes.left}>
                    <img className={classes.hero} src={BallotNavThumbnail} alt="ballotNav thumbnail" />
                </div>
                <div className={classes.right}>
                    <h1 className={classes.heading}>
                        See how it works
        </h1>
                    <p className={classes.message}>
                        Simple and intuitive.<br /> Find out how it works in this short video.
        </p>
                </div>
            </div>
            <div className={classes.bottom}>
                <div className={classes.bottomIcons}>
                    <img className={classes.iconSize} src={AccuracyIcon} alt={'accuracy-icon'} />
                    <p className={classes.subMessage}>
                        BallotNav <strong>validates election data</strong> to guarantee accurate results.
      </p>
                </div>
                <div className={classes.bottomIcons}>
                    <img className={classes.iconSize} src={LocationIcon} alt={'location-icon'} />
                    <p className={classes.subMessage}>
                        Search for your <strong>nearest drop off locations.</strong> View details and directions.
      </p>
                </div>
                <div className={classes.bottomIcons}>
                    <img className={classes.iconSize} src={TextIcon} alt={'text-icon'} />
                    <p className={classes.subMessage}>
                        Receive <strong>notifications</strong> on your phone.
      </p>
                </div>
            </div>
        </div >
    )
}

export default Section3
