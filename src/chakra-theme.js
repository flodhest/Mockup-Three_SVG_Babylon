// chakra-theme.js
import { extendTheme } from '@chakra-ui/react';
import Container3d from 'react-container-3d';

// Use Container3d if needed
console.log(Container3d);

const theme = extendTheme({
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
  },
  colors: {
    gre: '#008080',
    lightgrey: '#f0f0f0',
    white: '#ffffff',
    orange: 'orange',
  },
});

export default theme;
