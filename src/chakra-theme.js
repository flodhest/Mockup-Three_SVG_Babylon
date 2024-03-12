// chakra-theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
  },
  colors: {
    gre: '#008080',
    lightgrey: '#f0f0f0',
    white: '#ffffff',
    orange: '#1d2791',
  },
});

export default theme;
