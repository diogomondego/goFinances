import 'styled-components'
import theme from './theme'

declare module 'styled-components' {
  type ThemeType = typeof theme // typeof copia o tipo do 'theme' (ou seja, copia as props dela)

  export interface DefaultTheme extends ThemeType {}
}