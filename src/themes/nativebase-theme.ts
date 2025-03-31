import {normalizeFontSize} from 'src/utils/fontSize'
import {extendTheme} from 'native-base'
import {cusSelected, outlineButton, primaryButton} from './custom-variant'
import {Platform} from 'react-native'

const headerDefault = {
  color: 'text.neutral_primary',
  fontFamily: 'MuseoModerno',
  textAlign: 'center',
}

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
        normal: 'MuseoModerno-ExtraBold',
        italic: 'MuseoModerno-ExtraBoldItalic',
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
        italic: 'SF-Pro-Display-RegularItalic',
      },
      500: {
        normal: 'SF-Pro-Display-Semibold',
        italic: 'SF-Pro-Display-SemiboldItalic',
      },
      600: {
        normal: 'SF-Pro-Display-Semibold',
        italic: 'SF-Pro-Display-SemiboldItalic',
      },
      700: {
        normal: 'SF-Pro-Display-Bold',
        italic: 'SF-Pro-Display-BoldItalic',
        bold: 'SF-Pro-Display-Bold',
      },
      800: {
        normal: 'SF-Pro-Display-Bold',
        italic: 'SF-Pro-Display-BoldItalic',
      },
      900: {
        normal: 'SF-Pro-Display-Heavy',
        italic: 'SF-Pro-Display-HeavyItalic',
      },
    },
  },
  fonts: {
    heading: 'MuseoModerno',
    body: 'SFProDisplay',
    mono: 'SFProDisplay',
    MuseoModerno: 'MuseoModerno',
    SFProDisplay: 'SFProDisplay',
  },
  colors: {
    // Add new color
    primary: {
      neutral: '#172832',
      medium: '#C2F8CB',
      primary_light_medium: '#E0FBE4',
      primary_light: '#F5FFF5',
      medium50: '#C2F8CB50',
      medium25: '#C2F8CB25',
      600: '#C2F8CB',
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
    error: {
      error_dark: '#D7471A',
    },
  },
  components: {
    Button: {
      // Can simply pass default props to change default behaviour of components.

      baseStyle: () => {
        return {
          _text: {
            fontFamily: 'SFProDisplay',
          },
        }
      },
      variants: {
        cusPrimary: primaryButton,
        cusOutline: outlineButton,
        cusSelected: cusSelected,
      },
    },

    Text: {
      baseStyle: () => {},
      variants: {
        header_1: {
          ...headerDefault,
          fontSize: normalizeFontSize(36),
        },
        header_2: {
          ...headerDefault,

          fontSize: normalizeFontSize(30),
        },
        header_3: {
          ...headerDefault,
          fontSize: normalizeFontSize(24),
        },
        sf_header_1: {
          ...headerDefault,
          fontSize: normalizeFontSize(36),
          fontFamily: 'SF-Pro-Display-SemiBold',
          fontWeight: 700,
        },
        sf_header_2: {
          ...headerDefault,
          fontSize: normalizeFontSize(30),
          fontFamily: 'SF-Pro-Display-SemiBold',
          fontWeight: 700,
        },
        sf_header_3: {
          ...headerDefault,
          fontSize: normalizeFontSize(24),
          fontFamily: 'SF-Pro-Display-SemiBold',
          fontWeight: 700,
        },

        caption_regular: {
          fontFamily: 'SFProDisplay',
          color: 'text.neutral_primary',
          fontSize: normalizeFontSize(12),
          fontWeight: 400,
          lineHeight: Platform.OS === 'android' ? 14 : 16,
        },

        body_small_italic: {
          fontFamily: 'SF-Pro-Display-Italic',
          color: 'text.neutral_secondary',
          fontSize: normalizeFontSize(14),
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: Platform.OS === 'android' ? 20 : 22,
        },
        body_small_regular: {
          fontFamily: 'SF-Pro-Display-Regular',
          fontWeight: 400,
          color: 'text.neutral_primary',
          fontSize: normalizeFontSize(14),
          lineHeight: Platform.OS === 'android' ? 18 : 20,
        },

        body_small_bold: {
          fontFamily: 'SF-Pro-Display-SemiBold',
          fontWeight: 700,
          color: 'text.neutral_primary',
          fontSize: normalizeFontSize(14),
          lineHeight: Platform.OS === 'android' ? 20 : 22,
        },

        body_medium_regular: {
          fontFamily: 'SFProDisplay',
          fontWeight: 400,
          fontSize: normalizeFontSize(16),
          lineHeight: Platform.OS === 'android' ? 20 : 22,
        },
        body_medium_bold: {
          fontFamily: 'SF-Pro-Display-SemiBold',
          fontWeight: 700,
          color: 'text.neutral_primary',
          fontSize: normalizeFontSize(16),
          lineHeight: Platform.OS === 'android' ? 20 : 22,
        },

        body_large_regular: {
          fontFamily: 'SFProDisplay',
          color: 'text.neutral_primary',
          fontSize: normalizeFontSize(18),
          fontWeight: 400,
          lineHeight: Platform.OS === 'android' ? 24 : 26,
        },

        body_large_bold: {
          fontFamily: 'SF-Pro-Display-SemiBold',
          color: 'text.neutral_primary',
          fontSize: normalizeFontSize(18),
          fontWeight: 700,
          lineHeight: Platform.OS === 'android' ? 20 : 22,
        },
      },
    },
    Select: {},
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
})
