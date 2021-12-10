import React from 'react';
import '../node_modules/@fullcalendar/common/main.css'; // @fullcalendar/react imports @fullcalendar/common
import '../node_modules/@fullcalendar/daygrid/main.css'; // @fullcalendar/timegrid imports @fullcalendar/daygrid
import { ChakraProvider,extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })
function MyApp({ Component, pageProps }) {
  return(
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
