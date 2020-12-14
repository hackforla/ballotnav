import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { ReactComponent as NewWindowIcon } from 'assets/icons/new-window.svg'
import { ReactComponent as PhoneIcon } from 'assets/icons/phone.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.secondary.main}`,
    padding: 14,
    borderRadius: 10,
  },
  title: {
    textTransform: 'uppercase',
    color: theme.palette.secondary.main,
    fontWeight: 700,
    fontSize: 14,
    marginBottom: 8,
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    margin: '10px 20px 10px 0',
    '& > a': {
      display: 'inline-block',
      marginLeft: 6,
      textDecoration: 'underline',
      color: theme.palette.primary.main,
    },
  },
}))

const VerifyBox = ({ location, jurisdiction }) => {
  const classes = useStyles()

  if (!jurisdiction) return null
  const { phones, urls } = jurisdiction

  // TODO: use type names instead of type ids
  const phone = phones.find(ph => ph.phoneNumberTypeId === 1)?.phoneNumber
  const url = urls.find(url => url.urlTypeId === 10)?.url

  if (!phone && !url) return null
  return (
    <div className={classes.root}>
      <div className={classes.title}>To Verify</div>
      <div className={classes.info}>
        {phone && (
          <div className={classes.infoItem}>
            <PhoneIcon />
            <a href={`tel:${phone}`}>{phone}</a>
          </div>
        )}
        {url && (
          <div className={classes.infoItem}>
            <NewWindowIcon />
            <a href={url}>{url}</a>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyBox

VerifyBox.propTypes = {
  location: PropTypes.shape({}),
  jurisdiction: PropTypes.shape({}),
}

VerifyBox.defaultProps = {
  location: null,
  jurisdiction: null,
}
