import React, { useState } from 'react'
import {
  Grid,
  Button,
  Typography,
  Box,
  Modal,
  TextField,
  IconButton,
  Alert,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EmailIcon from '@mui/icons-material/Email'
import heroBg from '../assets/hero-3.png'
import './Hero.css'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import Toast from './Toast'

const HeroSection = () => {
  const [openModal, setOpenModal] = useState(false)
  const [referralLink, setReferralLink] = useState('Loading...')
  const [email, setEmail] = useState('')
  const [friendName, setFriendName] = useState('')
  const userName = useSelector((state) => state.auth.userName)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'info',
  })

  const showToast = (message, severity = 'info') => {
    setToast({ open: true, message, severity })
  }

  const closeToast = () => {
    setToast({ ...toast, open: false })
  }

  const handleOpenModal = () => {
    setOpenModal(true)
    if (isLoggedIn === false) {
      setError('Must login to generate referral code')
      return
    }
    setIsLoading(true)
    const url = `https://accredian-backend-task-9s5f.onrender.com/api/users/${userName}`
    const data = {
      username: userName,
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.ok) {
          const json = await response.json()
          setReferralLink(
            'http://localhost:5173/signup?referralCode=' + json.referralCode
          )
        } else {
          const json = await response.json()
          console.log(json)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
      .finally(() => {
        setIsLoading(false) // Set loading to false after fetching (whether successful or not)
      })
  }
  const handleCloseModal = () => setOpenModal(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    showToast('URL Copied To Clipboard.', 'info')
  }

  const handleSendEmail = () => {
    const data = {
      to: email,
      friendName: userName,
      referralLink,
    }

    // Define the fetch request options
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    // Make the fetch request to your backend endpoint
    fetch(
      'https://accredian-backend-task-9s5f.onrender.com/api/sendMail',
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
        showToast('Mail Sent Successfully', 'info')
        setEmail('')
        setFriendName('')
      })
      .catch((error) => {
        showToast('Mail Failed To Send. Try Again.', 'info')
        console.error('Error:', error)
      })
  }

  return (
    <div className="hero">
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={closeToast}
      />
      <Box
        sx={{
          flexGrow: 1,
          padding: '20px',
          background: 'transparent',
          position: 'relative',
        }}
        className="premium-section"
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6} className="grid-bottom">
            <Box
              sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Grid item xs={12}>
                <Typography
                  variant="h2"
                  sx={{
                    color: 'black',
                    textAlign: 'center',
                    marginBottom: '20px',
                    fontWeight: 'bold',
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  }}
                >
                  Friends that learn together, earn together!
                </Typography>
              </Grid>
              <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
                Refer And Earn!
              </Typography>
              <Button
                variant="contained"
                className="shining-button"
                size="large"
                sx={{ marginBottom: '10px', width: '200px' }}
                onClick={handleOpenModal}
              >
                REFER NOW
              </Button>
              <Typography
                variant="body1"
                align="center"
                sx={{ color: 'white' }}
              >
                Get a chance to win up-to{' '}
                <span className="highlight">Rs.10,000</span> worth courses for
                free!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} className="grid-bottom">
            <img
              src={heroBg}
              alt="Hero"
              style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
            />
          </Grid>
        </Grid>
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="referral-modal-title"
        aria-describedby="referral-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px',
          }}
        >
          <Typography
            id="referral-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Refer a Friend
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Share this referral link to your friend:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isLoading ? (
                <Box
                  sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
                >
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Loading referral link...
                  </Typography>
                </Box>
              ) : (
                <TextField
                  fullWidth
                  value={referralLink}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
              <IconButton
                onClick={handleCopyLink}
                color="primary"
                disabled={isLoading}
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Or Send via Email:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter friend's email"
                variant="outlined"
                size="small"
              />
              <IconButton onClick={handleSendEmail} color="primary">
                <EmailIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="referral-modal-title"
        aria-describedby="referral-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {
              xs: '90%', // Full width on extra small screens
              sm: '70%', // 70% width on small screens
              md: 600, // 600px on medium screens and above
            },
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: {
              xs: 2, // Less padding on extra small screens
              sm: 3, // Medium padding on small screens
              md: 4, // Large padding on medium screens and above
            },
            borderRadius: '10px',
          }}
        >
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
              {console.log(error)}
            </Alert>
          )}
          {isLoggedIn && (
            <Typography
              id="referral-modal-title"
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                fontSize: {
                  xs: '1.25rem',
                  sm: '1.5rem',
                },
              }}
            >
              Refer a Friend
            </Typography>
          )}
          {isLoggedIn && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Share this referral link to your friend:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  value={referralLink}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <IconButton onClick={handleCopyLink} color="primary">
                  <ContentCopyIcon />
                </IconButton>
              </Box>
            </Box>
          )}
          {isLoggedIn && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Or Send via Email:
              </Typography>
              <TextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter friend's email"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                placeholder="Enter friend's name"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendEmail}
                fullWidth
              >
                Send
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  )
}

export default HeroSection
