import React from 'react'
import { Button, Box } from '@material-ui/core'

function Footer({ onSaveProgress, onSubmitForReview }) {
  return (
    <Box style={{
      padding: 10,
      display: 'flex',
      justifyContent: 'flex-start',
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      opacity: 1.0,
      zIndex: 100,
    }}>
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
    </Box>
  )
}
export default Footer
