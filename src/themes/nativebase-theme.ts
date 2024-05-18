import React from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {background} from 'native-base/lib/typescript/theme/styled-system';
import {Dict} from 'native-base/lib/typescript/theme/tools';
import {primaryButton} from './custom-variant';

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
  },
  fonts: {
    heading: 'MuseoModerno',
    body: 'MuseoModerno',
    mono: 'MuseoModerno',
  },
  colors: {
    // Add new color
    primary: {
      neutral: '#172832',
      medium: '#C2F8CB',
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
        primary: primaryButton,
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
