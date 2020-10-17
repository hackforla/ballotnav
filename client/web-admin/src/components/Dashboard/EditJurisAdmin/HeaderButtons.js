import React from 'react'
import { Button, Box } from '@material-ui/core'

function AdminHeaderButtons({
  onSaveProgress,
  canSaveProgress = false,
  onPublish,
  canPublish = false,
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
        onClick={onPublish}
        variant="contained"
        disabled={!canPublish}
        color="secondary">
        Publish
      </Button>
    </Box>
  )
}
export default AdminHeaderButtons
