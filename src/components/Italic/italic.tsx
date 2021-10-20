import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faItalic } from '@fortawesome/free-solid-svg-icons'
import Button from '@components/Button/button'
import { formatItalic, matchIsTextIsItalic } from '@helpers/italic'
import { formatNormal } from '@helpers/string'
import { formatBold, matchIsTextIsBold } from '@helpers/bold'
import { formatBoldItalic, matchIsTextIsBoldItalic } from '@helpers/bold-italic'

type ItalicProps = {
  selection: Selection
  formatText: (newText: string) => void
}

const Italic = (props: ItalicProps): React.ReactElement => {
  const { selection, formatText } = props
  const currentText = selection.toString()
  const isTextIsItalic = matchIsTextIsItalic(currentText)
  const isTextIsBold = matchIsTextIsBold(currentText)
  const isTextIsBoldItalic = matchIsTextIsBoldItalic(currentText)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    if (isTextIsItalic) {
      const textInNormal = formatNormal(currentText)
      formatText(textInNormal)
    } else if (isTextIsBold) {
      const textInBoldItalic = formatBoldItalic(currentText)
      formatText(textInBoldItalic)
    } else if (isTextIsBoldItalic) {
      const textInBold = formatBold(formatNormal(currentText))
      formatText(textInBold)
    } else {
      const textInItalic = formatItalic(currentText)
      formatText(textInItalic)
    }
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      isSelected={isTextIsItalic || isTextIsBoldItalic}
    >
      <FontAwesomeIcon icon={faItalic} />
    </Button>
  )
}

export default Italic
