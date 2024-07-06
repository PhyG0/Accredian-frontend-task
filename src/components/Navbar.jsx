import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../authActions.jsx'

import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material'
import { styled, alpha } from '@mui/system'
import logo from '../assets/logo.png'

const StyledAppBar = styled(AppBar)({
  background: alpha('#ffffff', 0.8),
  backdropFilter: 'blur(8px)',
})

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
})

const LeftSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
})

const RightSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
})

const Logo = styled('img')({
  height: '40px',
  marginRight: '20px',
})

const StyledMenu = styled(Menu)({
  '& .MuiPaper-root': {
    width: '300px',
  },
})

const StyledMenuItem = styled(MenuItem)({
  padding: '16px',
})

const Navbar = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null)
  const [unreadNotifications, setUnreadNotifications] = useState(3)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleNotificationClose = () => {
    setAnchorEl(null)
    setUnreadNotifications(0)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const mobileMenuItems = [
    { text: 'Courses', onClick: () => {} },
    { text: 'Pricing', onClick: () => {} },
    {
      text: 'Sign In',
      onClick: () => {
        navigate('/signin')
      },
    },
    {
      text: 'Sign Up',
      onClick: () => {
        navigate('/signup')
      },
    },
  ]

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <LeftSection>
          <Logo src={logo} alt="Logo" />
          {!isMobile && (
            <>
              <Button color="inherit" sx={{ color: 'black' }}>
                Courses
              </Button>
              <Button color="inherit" sx={{ color: 'black' }}>
                Pricing
              </Button>
            </>
          )}
        </LeftSection>
        <RightSection>
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={unreadNotifications} color="error">
              <NotificationsIcon sx={{ color: 'black' }} />
            </Badge>
          </IconButton>
          {isMobile ? (
            <IconButton edge="end" color="inherit" onClick={toggleMobileMenu}>
              <MenuIcon sx={{ color: 'black' }} />
            </IconButton>
          ) : (
            <>
              <Button
                color="inherit"
                sx={{ color: 'black' }}
                onClick={() => {}}
              >
                About Us
              </Button>
              {isLoggedIn ? (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ ml: 1 }}
                  onClick={() => {
                    dispatch(logout())
                  }}
                >
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button
                    color="inherit"
                    sx={{ color: 'black' }}
                    onClick={() => {
                      navigate('/signin')
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ ml: 1 }}
                    onClick={() => {
                      navigate('/signup')
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </>
          )}
        </RightSection>
      </StyledToolbar>

      {/* Notifications Menu */}
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleNotificationClose}
      >
        <StyledMenuItem onClick={handleNotificationClose}>
          <Paper elevation={0} sx={{ p: 2, width: '100%' }}>
            <strong>New Message</strong>
            <p>You have a new message from John Doe.</p>
          </Paper>
        </StyledMenuItem>
        <StyledMenuItem onClick={handleNotificationClose}>
          <Paper elevation={0} sx={{ p: 2, width: '100%' }}>
            <strong>Event Reminder</strong>
            <p>Your meeting starts in 30 minutes.</p>
          </Paper>
        </StyledMenuItem>
        <StyledMenuItem onClick={handleNotificationClose}>
          <Paper elevation={0} sx={{ p: 2, width: '100%' }}>
            <strong>System Update</strong>
            <p>A new version of the app is available.</p>
          </Paper>
        </StyledMenuItem>
      </StyledMenu>

      {/* Mobile Menu Drawer */}
      <Drawer anchor="right" open={mobileMenuOpen} onClose={toggleMobileMenu}>
        <Box sx={{ width: 250 }} role="presentation">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={toggleMobileMenu}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {mobileMenuItems.map((item, index) => (
              <ListItem button key={item.text} onClick={item.onClick}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </StyledAppBar>
  )
}

export default Navbar
