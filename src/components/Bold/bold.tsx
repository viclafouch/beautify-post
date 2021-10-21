import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold } from '@fortawesome/free-solid-svg-icons'
import Button from '@components/Button/button'
import { matchIsTextIsBold } from '@helpers/bold'
import { formatTextByType } from '@helpers/string'
import { FormatType } from '@constants/format-type'

type BoldProps = {
  selection: Selection
  formatText: (newText: string) => void
}

const Bold = (props: BoldProps): React.ReactElement => {
  const { selection, formatText } = props
  const currentText = selection.toString()
  const isTextIsBold = matchIsTextIsBold(currentText)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    formatText(formatTextByType(currentText, FormatType.bold))
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
