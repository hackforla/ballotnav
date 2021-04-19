import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SectionHeader from './HeadSecThree'
import SubHeadSecThree from './SubHeadSecThree'
import Brigades from './Brigades'

const useStyles = makeStyles((theme) => ({
    root: {
        width: theme.layout.pageWidth,
        maxWidth: '100%',
        margin: '50px auto',
        textAlign: 'start',
        '& h1': {
            fontSize: 40,
            fontWeight: 'bold',
            color: '#1B2152',
        },
        '& a': {
            display: 'block',
            textDecoration: 'underline',
            marginTop: 10,
        },
    },
}))

const SectionThree = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <SectionHeader />
            <SubHeadSecThree />
            <Brigades />
        </div>
    )
}

export default SectionThree
