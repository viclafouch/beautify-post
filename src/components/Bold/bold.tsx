import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold } from '@fortawesome/free-solid-svg-icons'
import Button from '@components/Button/button'
import { formatBold, matchIsTextIsBold } from '@helpers/bold'
import { formatNormal } from '@helpers/string'
import { formatItalic, matchIsTextIsItalic } from '@helpers/italic'
import { formatBoldItalic, matchIsTextIsBoldItalic } from '@helpers/bold-italic'

type BoldProps = {
  selection: Selection
  formatText: (newText: string) => void
}

const Bold = (props: BoldProps): React.ReactElement => {
  const { selection, formatText } = props
  const currentText = selection.toString()
  const isTextIsBold = matchIsTextIsBold(currentText)
  const isTextIsItalic = matchIsTextIsItalic(currentText)
  const isTextIsBoldItalic = matchIsTextIsBoldItalic(currentText)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    if (isTextIsBold) {
      const textInNormal = formatNormal(currentText)
      formatText(textInNormal)
    } else if (isTextIsItalic) {
      const textInBoldItalic = formatBoldItalic(currentText)
      formatText(textInBoldItalic)
    } else if (isTextIsBoldItalic) {
      const textInItalic = formatItalic(formatNormal(currentText))
      formatText(textInItalic)
    } else {
      const textInBold = formatBold(currentText)
      formatText(textInBold)
    }
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      isSelected={isTextIsBold || isTextIsBoldItalic}
    >
      <FontAwesomeIcon icon={faBold} />
    </Button>
  )
}

export default Bold
