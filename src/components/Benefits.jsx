import React, { useState, useEffect } from 'react'
import './Benefits.css'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const sectors = ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail']

const realPrograms = [
  'Professional Certificate Program in Product Management',
  'Advanced Data Science and Machine Learning Bootcamp',
  'Digital Marketing Mastery Course',
  'Full-Stack Web Development Immersive',
  'Leadership and Management Excellence Program',
]

const generateRandomData = () => {
  return realPrograms.map((program) => ({
    program,
    referrerBonus: `$${Math.floor(Math.random() * 1000)}`,
    refereeBonus: `$${Math.floor(Math.random() * 500)}`,
  }))
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#007BFF',
    },
    background: {
      default: '#F8F9FA',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 123, 255, 0.1)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#007BFF',
            color: 'white',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#007BFF',
          '& .MuiTableCell-head': {
            color: 'white',
            fontWeight: 'bold',
          },
        },
      },
    },
  },
})

const SectorComponent = () => {
  const [selectedSector, setSelectedSector] = useState(sectors[0])
  const [tableData, setTableData] = useState([])

  const handleSectorClick = (sector) => {
    setSelectedSector(sector)
    setTableData(generateRandomData())
  }

  useEffect(() => {
    setTableData(generateRandomData())
  }, [])

  return (
    <div className="benefits">
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1, p: 2, backgroundColor: 'background.default' }}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            color="black"
            sx={{ mb: 6 }}
          >
            What Are The Referral Benefits?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={0}>
                <List>
                  {sectors.map((sector) => (
                    <ListItem key={sector} disablePadding>
                      <ListItemButton
                        onClick={() => handleSectorClick(sector)}
                        selected={sector === selectedSector}
                      >
                        <ListItemText primary={sector} />
                        <ArrowForwardIosIcon fontSize="small" />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper elevation={0}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    {selectedSector} Sector
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Program</TableCell>
                          <TableCell>Referrer Bonus</TableCell>
                          <TableCell>Referee Bonus</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableData.map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              '&:nth-of-type(odd)': {
                                backgroundColor: '#F1F8FF',
                              },
                            }}
                          >
                            <TableCell>{row.program}</TableCell>
                            <TableCell>{row.referrerBonus}</TableCell>
                            <TableCell>{row.refereeBonus}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default SectorComponent
