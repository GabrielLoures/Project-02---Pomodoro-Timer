import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' // variável de tipagem

interface ButtonContainerProps {
  variant: ButtonVariant
} // diferente da ButtonProps do componentes, nao colocamos nossa variant como opcional (?:)

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  background-color: ${(props) => props.theme['green-500']};
`
