import React from 'react'
import { Paper, Button } from '@material-ui/core'

function Footer({ onSaveProgress, onSubmitForReview }) {
  return (
    <Paper style={{ padding: 10, display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        style={{ margin: 10 }}
        onClick={onSaveProgress}
        variant="contained"
        color="primary">
        Save Progress
      </Button>
      <Button
        style={{ margin: 10 }}
        onClick={onSubmitForReview}
        variant="contained"
        color="primary">
        Submit for Review
      </Button>
    </Paper>
  )
}

export default Footer
