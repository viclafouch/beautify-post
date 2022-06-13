import React from 'react'
import Button from '@components/Button/button'
import { FormatType } from '@constants/format-type'
import { faFont } from '@fortawesome/free-solid-svg-icons/faFont'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatSelectionByType } from '@helpers/selection'
import { matchIsTextIsUppercase } from '@helpers/uppercase'

type UppercaseProps = {
  selection: Selection
  onFormat: () => void
}

const Uppercase = (props: UppercaseProps): React.ReactElement => {
  const { selection, onFormat } = props
  const currentText = selection.toString()
  const isTextIsUppercase = matchIsTextIsUppercase(currentText)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault()
    formatSelectionByType(selection, FormatType.uppercase)
    onFormat()
  }

  return (
    <Button
      aria-label="Uppercase"
      type="button"
      onClick={handleClick}
      isSelected={isTextIsUppercase}
    >
      <FontAwesomeIcon icon={faFont} />
    </Button>
  )
}

export default Uppercase
