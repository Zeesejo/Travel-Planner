import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import './index.css';

// Create a modern theme with more vibrant colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#1B5E20', // Darker green for better contrast
      light: '#4CAF50',
      dark: '#0D3F10',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF6F00', // Vibrant orange for better visibility
      light: '#FF9800',
      dark: '#E65100',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F2937',
      secondary: '#4B5563',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '0em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontWeight: 500,
      letterSpacing: '0em',
    },
    h6: {
      fontWeight: 500,
      letterSpacing: '0.0075em',
    },
    button: {
      fontWeight: 500,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '8px 24px',
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          transition: 'all 0.2s ease-in-out',
          
          // Remove the AppBar button styling from here
          // (removing this ensures it doesn't interfere with our styled NavButton)
        },
        contained: {
          color: '#FFFFFF', // Ensuring text is white on contained buttons
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.04)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.04)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          // Add exception for AppBar
          '.MuiAppBar-root&': {
            borderRadius: 0,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          width: '100%',
          margin: 0,
          padding: 0,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '.MuiAppBar-root &': {
            maxWidth: '100%',
            margin: 0,
            padding: 0,
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
