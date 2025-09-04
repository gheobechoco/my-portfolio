import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#64ffda',
      light: '#9afff5',
      dark: '#00ccaa',
    },
    secondary: {
      main: '#112240',
      light: '#1c3b5e',
      dark: '#0a192f',
    },
    background: {
      default: '#0a192f',
      paper: '#112240',
    },
    text: {
      primary: '#ccd6f6',
      secondary: '#8892b0',
      disabled: '#495670',
    },
    divider: 'rgba(100, 255, 218, 0.1)',
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      color: '#64ffda',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.8rem',
      color: '#64ffda',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.2rem',
      color: '#64ffda',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.8rem',
      color: '#ccd6f6',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.4rem',
      color: '#ccd6f6',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.2rem',
      color: '#ccd6f6',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#8892b0',
    },
    body2: {
      fontSize: '0.9rem',
      lineHeight: 1.5,
      color: '#8892b0',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '4px',
          fontWeight: 500,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 20px rgba(100, 255, 218, 0.3)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;