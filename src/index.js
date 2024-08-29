import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({
  reducer:rootReducer
})
const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  palette: {
    primary: {
      main: '#3F51B5',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#E0C2FF',
      light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F',
    },
  },
  typography: {
    h1: {
      fontSize: '1.2rem'
    },
    body2: {
      fontSize: '0.8rem'
    }
  }
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>

);
