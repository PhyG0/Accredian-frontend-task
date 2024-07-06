import React from 'react'
import './Footer.css'
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
} from '@mui/material'
import { styled } from '@mui/system'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import logo from '../assets/logo.png'

const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: '#000',
  color: '#fff',
  padding: theme.spacing(6, 0),
}))

const Logo = styled('img')({
  height: 40,
  marginRight: 16,
})

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'blue',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'black',
  },
}))

const Footer = () => {
  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Box display="flex" alignItems="center" className="push-right">
              <Logo src={logo} alt="Company Logo" />
              <StyledButton variant="contained" sx={{ ml: 2 }}>
                Schedule 1-on-1 Call Now
              </StyledButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body2">
              123 Main Street, City, Country
            </Typography>
            <Typography variant="body2">Phone: +1 (123) 456-7890</Typography>
            <Typography variant="body2">Email: info@example.com</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Our Programs
            </Typography>
            <Typography variant="body2">AI and Machine Learning</Typography>
            <Typography variant="body2">Product Management</Typography>
            <Typography variant="body2">Data Science</Typography>
            <Typography variant="body2">Software Engineering</Typography>
            <Typography variant="body2">Cybersecurity</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </StyledFooter>
  )
}

export default Footer
