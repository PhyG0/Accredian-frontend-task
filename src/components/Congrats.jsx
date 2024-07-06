import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Snackbar,
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'

const CongratulationsModal = ({ open, onClose }) => {
  const [showToast, setShowToast] = useState(false)

  const handleClaimReward = () => {
    setShowToast(true)
    onClose()
  }

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setShowToast(false)
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <Typography>
            You have successfully completed referral process. Claim your reward
            now!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
          <Button
            onClick={handleClaimReward}
            color="primary"
            variant="contained"
          >
            Claim Reward
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showToast}
        autoHideDuration={6000}
        onClose={handleCloseToast}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseToast}
          severity="success"
        >
          Reward claimed successfully!
        </MuiAlert>
      </Snackbar>
    </>
  )
}

export default CongratulationsModal
