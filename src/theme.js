import { DefaultTheme } from 'react-native-paper';

export const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#000000', // black for background  
    text: '#FFFFFF', // white for text
    primary: '#00FF00', //  green for primary elements
    surface: '#121212', // dark gray for surfaces
    accent: '#00FF00' , // green for accents  
     error: '#00FF00' , // green for error messages
  },
};
