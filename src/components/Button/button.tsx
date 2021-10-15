import React from 'react'
import Styled from './button.styled'

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  isSelected?: boolean
}

const Button = (props: ButtonProps): React.ReactElement => {
  const { children, isSelected, ...rest } = props
  return (
    <Styled $isSelected={Boolean(isSelected)} {...rest}>
      {children}
    </Styled>
  )
}

export default Button
