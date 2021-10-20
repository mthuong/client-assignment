import { TextStyle } from 'react-native'

const fonts = {
  regular: {
    fontFamily: 'Roboto',
  } as TextStyle,
  bold: {
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
  } as TextStyle,
  medium: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '300',
  } as TextStyle,
  light: {
    fontFamily: 'Roboto-Light',
    fontWeight: '200',
  } as TextStyle,
  thin: {
    fontFamily: 'Roboto-Thin',
    fontWeight: '100',
  } as TextStyle,
} as const

export default fonts

export type Font = typeof fonts
