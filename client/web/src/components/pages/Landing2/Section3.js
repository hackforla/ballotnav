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
    left: {
        width: '60%',
        height: '60%'
    },
    right: {
        width: '50%',
        height: '60%',
        display: 'flex',
        flexDirection: 'column',
    },
    bottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomIcons: {
        width: '35%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5em 1em',
        "& img": {
            marginRight: '1em'
        }
    },

    heading: {
        fontWeight: 700,
        fontSize: 39,
        lineHeight: '45px',
    },
    message: {
        marginTop: '1em',
        fontWeight: 400,
        fontSize: 20,
        lineHeight: '27px',
    },
    subMessage: {
        fontWeight: 400,
        fontSize: 20,
        lineHeight: '27px',
    }



}))

const Section3 = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.top}>
                <div className={classes.left}>
                    <img className={classes.hero} src={BallotNavThumbnail} />
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
                    <img src={AccuracyIcon} alt={'accuracy-icon'} />
                    <p className={classes.subMessage}>
                        BallotNav <strong>validates election data</strong> to guarantee accurate results.
      </p>
                </div>
                <div className={classes.bottomIcons}>
                    <img src={LocationIcon} alt={'location-icon'} />
                    <p className={classes.subMessage}>
                        Search for your <strong>nearest drop off locations.</strong> View details and directions.
      </p>
                </div>
                <div className={classes.bottomIcons}>
                    <img src={TextIcon} alt={'text-icon'} />
                    <p className={classes.subMessage}>
                        Receive <strong>notifications</strong> on your phone.
      </p>
                </div>
            </div>
        </div >
    )
}

export default Section3
