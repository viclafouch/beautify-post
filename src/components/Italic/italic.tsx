import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faItalic } from '@fortawesome/free-solid-svg-icons'
import Button from '@components/Button/button'
import { matchIsTextIsItalic } from '@helpers/italic'
import { formatTextByType } from '@helpers/string'
import { FormatType } from '@constants/format-type'

type ItalicProps = {
  selection: Selection
  formatText: (newText: string) => void
}

const Italic = (props: ItalicProps): React.ReactElement => {
  const { selection, formatText } = props
  const currentText = selection.toString()
  const isTextIsItalic = matchIsTextIsItalic(currentText)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    formatText(formatTextByType(currentText, FormatType.italic))
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
