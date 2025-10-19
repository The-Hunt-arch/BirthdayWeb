import React from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const baseTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#ff4d8d', light: '#ff7fb0', dark: '#c60055' },
    secondary: { main: '#7f4dff', light: '#b08dff', dark: '#4b00c6' },
    background: { default: '#fff7fb', paper: '#ffffff' }
  },
  customGradients: {
    brand: 'linear-gradient(135deg,#ff4d8d 0%, #ffb86c 35%, #7f4dff 70%, #4dd4ff 100%)'
  },
  typography: {
    fontFamily: '"Poppins", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-1px' },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 }
  },
  shape: { borderRadius: 18 },
  shadows: [
    'none','0 2px 6px rgba(255,77,141,0.15)','0 4px 12px rgba(127,77,255,0.18)','0 6px 16px rgba(0,0,0,0.12)','0 10px 24px rgba(0,0,0,0.14)',
    ...Array(20).fill('0 0 0 rgba(0,0,0,0.12)')
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', fontWeight: 600, borderRadius: 30, padding: '10px 22px',
          background: 'linear-gradient(90deg,#ff4d8d,#ffb86c)', color: '#fff',
          boxShadow: '0 8px 20px -6px rgba(255,77,141,0.45)', transition: 'transform .25s ease, box-shadow .25s ease',
          '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 14px 28px -10px rgba(255,77,141,0.55)' }
        }
      }
    },
    MuiPaper: { styleOverrides: { root: { backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.75)' } } }
  }
});

const theme = responsiveFontSizes(baseTheme);

export const AppThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default theme;
