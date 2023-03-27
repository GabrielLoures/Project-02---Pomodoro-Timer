// ARQUIVO DE DEFINIÇÃO DE TIPOS (SÓ ESCREVEMOS TIPAGEM NELE)

import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme // inferimos as tipagens que vem do defaultTheme automaticamente pelo typescript a um type criado por nós

declare module 'styled-components' {
  // estou criando uma tipagem pro module styled-components
  export interface DefaultTheme extends ThemeType {}
}
