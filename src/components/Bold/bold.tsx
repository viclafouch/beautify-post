import React from 'react'
import Button from '@components/Button/button'
import { FormatType } from '@constants/format-type'
import { faBold } from '@fortawesome/free-solid-svg-icons/faBold'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { matchIsTextIsBold } from '@helpers/bold'
import { formatSelectionByType } from '@helpers/selection'

type BoldProps = {
  selection: Selection
  onFormat: () => void
}

const Bold = (props: BoldProps): React.ReactElement => {
  const { selection, onFormat } = props
  const currentText = selection.toString()
  const isTextIsBold = matchIsTextIsBold(currentText)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault()
    formatSelectionByType(selection, FormatType.bold)
    onFormat()
  }

  return (
    <Button
      aria-label="Bold"
      type="button"
      onClick={handleClick}
      isSelected={isTextIsBold}
    >
      <FontAwesomeIcon icon={faBold} />
    </Button>
  )
}

export default Bold
