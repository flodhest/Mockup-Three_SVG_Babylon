import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './chakra-theme';

// Use createRoot directly
const root = createRoot(document.getElementById('root'));

root.render(
  <ChakraProvider theme={theme}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </ChakraProvider>
);
