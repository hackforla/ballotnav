import React from 'react'
import { Button, Box } from '@material-ui/core'

function HeaderButtons({
  onSaveProgress,
  canSaveProgress = false,
  onSubmitForReview,
  canSubmitForReview = false,
}) {
  return (
    <Box style={{ backgroundColor: 'white', borderRadius: 5 }}>
      <Button
        style={{ margin: 10 }}
        onClick={onSaveProgress}
        variant="contained"
        disabled={!canSaveProgress}
        color="secondary">
        Save Progress
      </Button>
      <Button
        style={{ margin: 10, marginLeft: 0 }}
        onClick={onSubmitForReview}
        variant="contained"
        disabled={!canSubmitForReview}
        color="secondary">
        Submit for Review
      </Button>
    </Box>
  )
}
export default HeaderButtons
