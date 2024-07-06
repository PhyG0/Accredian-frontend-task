import React, { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link as MuiLink,
  CircularProgress,
  Alert,
} from '@mui/material'
import { styled } from '@mui/system'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../authActions.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

import logo from '../assets/logo.png'

const BackgroundBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  minWidth: '100vw',
  background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
}))

const ContainerBox = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(8),
  backgroundColor: 'white',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}))

const FormBox = styled('form')(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  marginTop: theme.spacing(3),
}))

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: '#007BFF',
  color: 'white',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
}))

const Logo = styled('img')(({ theme }) => ({
  width: '200px',
  marginBottom: theme.spacing(3),
}))

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    const url = 'https://accredian-backend-task-9s5f.onrender.com/auth/login'
    const data = {
      username: username,
      password: password,
    }

    if (username == '' || password == '') {
      setError(`Login failed. Username and password is required`)
      setIsLoading(false)
      return
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
          dispatch(login(username))
          navigate('/')
        } else {
          const json = await response.json()
          console.log(json)
          setError(`Login failed. ${json.message}`)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <BackgroundBox>
      <ContainerBox>
        <Logo src={logo} alt="Company Logo" />
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        <FormBox onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Sign In'
            )}
          </SubmitButton>
        </FormBox>
        <Typography variant="body1" style={{ marginTop: '20px' }}>
          Don't have an account?{' '}
          <MuiLink component={Link} to="/signup" color="primary">
            Sign Up
          </MuiLink>
        </Typography>
        <Typography variant="body1">
          <MuiLink component={Link} to="/" color="primary">
            Back to Home Screen
          </MuiLink>
        </Typography>
      </ContainerBox>
    </BackgroundBox>
  )
}

export default SignIn
