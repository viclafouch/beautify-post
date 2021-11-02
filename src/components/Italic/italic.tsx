import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faItalic } from '@fortawesome/free-solid-svg-icons/faItalic'
import Button from '@components/Button/button'
import { matchIsTextIsItalic } from '@helpers/italic'
import { FormatType } from '@constants/format-type'
import { formatSelectionByType } from '@helpers/selection'

type ItalicProps = {
  selection: Selection
  onFormat: () => void
}

const Italic = (props: ItalicProps): React.ReactElement => {
  const { selection, onFormat } = props
  const currentText = selection.toString()
  const isTextIsItalic = matchIsTextIsItalic(currentText)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    formatSelectionByType(selection, FormatType.italic)
    onFormat()
  }

  return (
    <Button
      aria-label="Italic"
      type="button"
      onClick={handleClick}
      isSelected={isTextIsItalic}
    >
      <FontAwesomeIcon icon={faItalic} />
    </Button>
  )
}

export default Italic
