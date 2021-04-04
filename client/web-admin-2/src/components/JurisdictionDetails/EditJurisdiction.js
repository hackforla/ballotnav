import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useForm from './useForm'
import useVolunteerActions from 'store/actions/volunteer'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Button, TextField, Grid } from '@material-ui/core'
import { pick } from 'services/utils'

const validationSchema = Yup.object({
  name: Yup.string(),
  authorityName: Yup.string(),
});

const useStyles = makeStyles((theme) => ({
  root: {},
  changed: {
    '&:after': {
      content: '"*"',
      position: 'absolute',
      top: 0,
      right: -10,
      color: theme.palette.primary.main,
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  clearButton: {
    color: theme.palette.link.main,
    fontSize: 12,
    textDecoration: 'underline',
    cursor: 'pointer',
    visibility: ({ dirty }) => dirty ? 'visible' : 'hidden',
    marginRight: '2em',
  },
  submitButton: {
    textTransform: 'none',
    borderRadius: '2em',
    padding: '0.375em 3em',
    fontWeight: 700,
    fontSize: 12,
  },
}))

const FIELDS = [
  'name',
  'authorityName',
  'mailAddress1',
  'mailAddress2',
  'mailAddress3',
  'internalNotes'
]

const EditJurisdiction = ({ wipJurisdiction: wip }) => {
  const { updateWipJurisdiction } = useVolunteerActions()
  const isSubmitting = false // TODO: add to store

  const onSubmit = useCallback((values) => {
    updateWipJurisdiction({
      ...wip,
      ...values,
    })
  }, [wip, updateWipJurisdiction])

  const {
    handleSubmit,
    handleReset,
    handleChange,
    errors,
    touched,
    values,
    dirty,
    changed,
  } = useForm({
    enableReinitialize: true,
    initialValues: pick(wip, FIELDS),
    validationSchema,
    onSubmit,
  })

  const classes = useStyles({ dirty })

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              margin="dense"
              fullWidth
              value={values.name}
              onChange={handleChange}
              helperText={touched.name ? errors.name : ''}
              error={touched.name && Boolean(errors.name)}
              className={clsx({[classes.changed]: changed.name})}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Authority Name"
              name="authorityName"
              variant="outlined"
              margin="dense"
              fullWidth
              value={values.authorityName}
              onChange={handleChange}
              helperText={touched.authorityName ? errors.authorityName : ''}
              error={touched.authorityName && Boolean(errors.authorityName)}
              className={clsx({[classes.changed]: changed.authorityName})}
            />
          </Grid>
          <Grid container item xs={6} spacing={0}>
            <Grid item xs={12}>
              <TextField
                label="Address Line 1"
                name="mailAddress1"
                variant="outlined"
                margin="dense"
                fullWidth
                value={values.mailAddress1}
                onChange={handleChange}
                helperText={touched.mailAddress1 ? errors.mailAddress1 : ''}
                error={touched.mailAddress1 && Boolean(errors.mailAddress1)}
                className={clsx({[classes.changed]: changed.mailAddress1})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address Line 2"
                name="mailAddress2"
                variant="outlined"
                margin="dense"
                fullWidth
                value={values.mailAddress2}
                onChange={handleChange}
                helperText={touched.mailAddress2 ? errors.mailAddress2 : ''}
                error={touched.mailAddress2 && Boolean(errors.mailAddress2)}
                className={clsx({[classes.changed]: changed.mailAddress2})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address Line 3"
                name="mailAddress3"
                variant="outlined"
                margin="dense"
                fullWidth
                value={values.mailAddress3}
                onChange={handleChange}
                helperText={touched.mailAddress3 ? errors.mailAddress3 : ''}
                error={touched.mailAddress3 && Boolean(errors.mailAddress3)}
                className={clsx({[classes.changed]: changed.mailAddress3})}
              />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="textarea"
              label="Internal Notes"
              name="internalNotes"
              variant="outlined"
              margin="dense"
              fullWidth
              multiline
              rows={7}
              value={values.internalNotes}
              onChange={handleChange}
              helperText={touched.internalNotes ? errors.internalNotes : ''}
              error={touched.internalNotes && Boolean(errors.internalNotes)}
              className={clsx({[classes.changed]: changed.internalNotes})}
            />
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={6} className={classes.buttons}>
            <div
              className={classes.clearButton}
              onClick={handleReset}
            >
              Clear changes
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              margin="normal"
              disabled={!dirty || isSubmitting}
              className={classes.submitButton}
            >
              Update Jurisdiction
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default EditJurisdiction
