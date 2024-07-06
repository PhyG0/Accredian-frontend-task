import React from 'react'
import { Typography, Grid, Paper, Box } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import './Steps.css'

const ThreeStepProcess = () => {
  return (
    <div className="steps">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Three Easy Steps.
        </Typography>

        <Typography variant="body1" paragraph align="center">
          Follow these simple steps to earn rewards and share the benefits with
          your friends. It's quick, easy, and mutually rewarding!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box textAlign="center">
              <EmailIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Step 1
              </Typography>
              <Typography variant="body2">
                Spread the word via email or share link using social sharing.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box textAlign="center">
              <PersonAddIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Step 2
              </Typography>
              <Typography variant="body2">
                Your friend signs up and gets the reward.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box textAlign="center">
              <CardGiftcardIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Step 3
              </Typography>
              <Typography variant="body2">
                You get the reward up-to Rs.10,000
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default ThreeStepProcess
