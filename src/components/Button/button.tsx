import React from 'react'
import { css } from '@emotion/css'
import { BUTTON_HEIGHT } from '@constants/style'

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  isSelected?: boolean
}

const classNames = {
  root: css`
    height: ${BUTTON_HEIGHT}px;
    color: #000000;
    min-width: 24px;
    padding-inline: 5px;
  `
}

const Button = (props: ButtonProps): React.ReactElement => {
  const { children, isSelected, ...rest } = props
  const [isHovering, setIsHovering] = React.useState<boolean>(false)

  const handleMouseDown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault()
  }

  const handleMouseEnter = (): void => {
    setIsHovering(true)
  }

  const handleMouseLeave = (): void => {
    setIsHovering(false)
  }

  return (
    <button
      type="button"
      tabIndex={-1}
      aria-pressed={Boolean(isSelected)}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classNames.root}
      style={{
        backgroundColor: isSelected || isHovering ? '#eff2f5' : '#ffffff'
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
