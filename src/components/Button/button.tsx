import React from 'react'
import Styled from './button.styled'

type ButtonProps = React.DOMAttributes<HTMLButtonElement> &
  React.HTMLProps<HTMLButtonElement>

const Button = (props: ButtonProps): React.ReactElement => {
  const { children } = props
  return <Styled>{children}</Styled>
}

export default Button
