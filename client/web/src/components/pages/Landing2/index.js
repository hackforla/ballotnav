import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Header from './Header'
import Rectangle from 'assets/images/rectangle-shape.svg'
import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'
import Section4 from './Section4'
import Section5 from './Section5'

const useStyles = makeStyles((theme) => ({
    root: {
        width: theme.layout.pageWidth,
        maxWidth: '100%',
        margin: '0 auto',
        color: theme.palette.primary.main,
    },
    background: {
        position: 'absolute',
        zIndex: -1,
        top: '-2%',
        left: '0%',
        width: '1800px',
    }


}))

const Landing = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <img className={classes.background} src={Rectangle} alt="background-section" />
            <Header />
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
        </div>
    )
}

export default Landing
