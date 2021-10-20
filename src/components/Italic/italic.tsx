import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faItalic } from '@fortawesome/free-solid-svg-icons'
import Button from '@components/Button/button'
import { formatItalic, matchIsTextIsItalic } from '@helpers/italic'
import { formatNormal } from '@helpers/string'
import { formatBold, matchIsTextIsBold } from '@helpers/bold'
import { formatBoldItalic } from '@helpers/bold-italic'

type ItalicProps = {
  selection: Selection
  formatText: (newText: string) => void
}

const Italic = (props: ItalicProps): React.ReactElement => {
  const { selection, formatText } = props
  const currentText = selection.toString()
  const isTextIsItalic = matchIsTextIsItalic(currentText)
  const isTextIsBold = matchIsTextIsBold(currentText)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    if (isTextIsItalic && isTextIsBold) {
      const textInBold = formatBold(formatNormal(currentText))
      formatText(textInBold)
    } else if (isTextIsItalic) {
      const textInBoldItalic = formatBoldItalic(currentText)
      formatText(textInBoldItalic)
    } else if (isTextIsItalic) {
      const normalText = formatNormal(currentText)
      formatText(normalText)
    } else {
      const textInItalic = formatItalic(currentText)
      formatText(textInItalic)
    }
  }

  return (
    <Button type="button" onClick={handleClick} isSelected={isTextIsItalic}>
      <FontAwesomeIcon icon={faItalic} />
    </Button>
  )
}

export default Italic
