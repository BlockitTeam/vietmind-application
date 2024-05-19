import React from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {background} from 'native-base/lib/typescript/theme/styled-system';
import {outlineButton, primaryButton} from './custom-variant';

export const themeNativeBase = extendTheme({
  fontConfig: {
    MuseoModerno: {
      100: {
        normal: 'MuseoModerno-Light',
        italic: 'MuseoModerno-LightItalic',
      },
      200: {
        normal: 'MuseoModerno-Light',
        italic: 'MuseoModerno-LightItalic',
      },
      300: {
        normal: 'MuseoModerno-Light',
        italic: 'MuseoModerno-LightItalic',
      },
      400: {
        normal: 'MuseoModerno-Regular',
        italic: 'MuseoModerno-Italic',
      },
      500: {
        normal: 'MuseoModerno-Medium',
        italic: 'MuseoModerno-MediumItalic',
      },
      600: {
        normal: 'MuseoModerno-Medium',
        italic: 'MuseoModerno-MediumItalic',
      },
      700: {
        normal: 'MuseoModerno-Bold',
        italic: 'MuseoModerno-BoldItalic',
      },
      800: {
        normal: 'MuseoModerno-Bold',
        italic: 'MuseoModerno-BoldItalic',
      },
      900: {
        normal: 'MuseoModerno-Bold',
        italic: 'MuseoModerno-BoldItalic',
      },
    },
    SFProDisplay: {
      100: {
        normal: 'SF-Pro-Display-Ultralight',
        italic: 'SF-Pro-Display-UltralightItalic',
      },
      200: {
        normal: 'SF-Pro-Display-Thin',
        italic: 'SF-Pro-Display-ThinItalic',
      },
      300: {
        normal: 'SF-Pro-Display-Thin',
        italic: 'SF-Pro-Display-ThinItalic',
      },
      400: {
        normal: 'SF-Pro-Display-Regular',
        italic: 'MuseoModerno-RegularItalic',
      },
      500: {
        normal: 'MuseoModerno-Semibold',
        italic: 'MuseoModerno-SemiboldItalic',
      },
      600: {
        normal: 'MuseoModerno-Semibold',
        italic: 'MuseoModerno-SemiboldItalic',
      },
      700: {
        normal: 'MuseoModerno-Bold',
        italic: 'MuseoModerno-BoldItalic',
      },
      800: {
        normal: 'MuseoModerno-Bold',
        italic: 'MuseoModerno-BoldItalic',
      },
      900: {
        normal: 'MuseoModerno-Heavy',
        italic: 'MuseoModerno-HeavyItalic',
      },
    },
  },
  fonts: {
    heading: 'MuseoModerno',
    body: 'SFProDisplay',
    mono: 'SFProDisplay',
  },
  colors: {
    // Add new color
    primary: {
      neutral: '#172832',
      medium: '#C2F8CB',
      medium50: '#C2F8CB50',
    },
    text: {
      neutral_primary: '#172832',
      neutral_secondary: '#43525A',
      default: '#010C04',
      neutral_teriary: '#5F7581',
    },
    background: {
      medium: '#E0E9ED',
    },
  },
  components: {
    Button: {
      // Can simply pass default props to change default behaviour of components.
      variants: {
        cusPrimary: primaryButton,
        cusOutline: outlineButton,
      },
    },
    // Heading: {
    //   // Can pass also function, giving you access theming tools
    //   baseStyle: ({ colorMode }) => {
    //     return {
    //       color: colorMode === 'dark' ? 'red.300' : 'blue.300',
    //       fontWeight: 'normal',
    //     };
    //   },
    // },
  },

  // Redefining only one shade, rest of the color will remain same.

  // config: {
  //   // Changing initialColorMode to 'dark'
  //   initialColorMode: 'dark',
  // },
});
