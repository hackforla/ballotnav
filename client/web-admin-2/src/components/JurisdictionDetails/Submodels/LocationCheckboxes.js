import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check'

const BOXES = [
  {
    title: 'Type',
    field: 'facilityTypeId',
  },
  {
    title: 'Address1',
    field: 'address1',
  },
  {
    title: 'Address2',
    field: 'address2',
  },
  {
    title: 'Address3',
    field: 'address3',
  },
  {
    title: 'City',
    field: 'city',
  },
  {
    title: 'Zip',
    field: 'zip',
  },
  {
    title: 'Time Zone',
    field: 'timezone',
  },
  {
    title: 'Rules',
    field: 'rules',
  },
  {
    title: 'Name',
    field: 'contactName',
  },
  {
    title: 'Phone',
    field: 'contactPhone',
  },
  {
    title: 'Email',
    field: 'contactEmail',
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  column: {
    flex: 1,
    borderRight: '1px #C3C8E4 solid',
    '&:first-child': {
      borderLeft: '1px #C3C8E4 solid',
    }
  },
  title: {
    padding: '1em 0.5em',
    backgroundColor: '#E5E7F3',
    fontWeight: 700,
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  check: {
    padding: '1em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  isChecked: {
    backgroundColor: '#07917A',
    border: `2px #07917A solid`,
  },
  notChecked: {
    border: `2px ${theme.palette.secondary.main} solid`,
    '& .MuiSvgIcon-root': {
      visiblity: 'hidden',
    },
  },
  icon: {
    fontSize: 12,
    display: 'block',
    color: theme.palette.common.white,
  }
}))

const LocationCheckboxes = ({ location }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {BOXES.map(({ title, field }, index) => (
        <div key={index.toString()} className={classes.column}>
          <div className={classes.title}>{ title }</div>
          <div className={classes.check}>
            <div className={location[field]
              ? classes.isChecked
              : classes.notChecked
            }>
              <CheckIcon className={classes.icon} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LocationCheckboxes
