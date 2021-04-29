import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CodeForAmericaIcon from 'assets/brigade-icons/code-for-america.svg'
import HackForLaIcon from 'assets/brigade-icons/hack-for-la.svg'
import CodeForSanJoseIcon from 'assets/brigade-icons/code-for-san-jose.svg'
import CodeForAtlIcon from 'assets/brigade-icons/code-for-atl.svg'
import OpenOaklandIcon from 'assets/brigade-icons/open-oakland.svg'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    maxWidth: '100%',
    marginTop: 35,
    // backgroundColor: 'green',
    // color: props => props.color,
  },
})

const Brigades = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <img style={{ height: '55px' }} src={CodeForAmericaIcon} />
      <img style={{ height: '55px' }} src={HackForLaIcon} />
      <img style={{ height: '65px' }} src={CodeForSanJoseIcon} />
      <img style={{ height: '55px' }} src={CodeForAtlIcon} />
      <img style={{ height: '55px' }} src={OpenOaklandIcon} />
    </div>
  )
}

export default Brigades
