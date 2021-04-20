import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import JoinUsHero from 'assets/images/join-us-hero.svg'


const useStyles = makeStyles({
    root: {
        // maxWidth: '250px',
        display: 'flex',
        justifyContent: 'flex-end',
        // backgroundColor: 'blue',
        // color: props => props.color,
    },
});

const HeroImgSecFive = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <img style={{height: '455px'}}src={JoinUsHero} />
        </div>
    )
};

export default HeroImgSecFive;