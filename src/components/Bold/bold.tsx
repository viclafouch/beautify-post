import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold } from '@fortawesome/free-solid-svg-icons'
import Button from '@components/Button/button'
import { formatBold, formatNormal } from '@helpers/string'
import { matchIsTextIsBold } from '@helpers/boolean'

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
    if (isTextIsBold) {
      const textInNormal = formatNormal(currentText)
      formatText(textInNormal)
    } else {
      const textInBold = formatBold(currentText)
      formatText(textInBold)
    }
  }

  return (
    <Button type="button" onClick={handleClick} isSelected={isTextIsBold}>
      <FontAwesomeIcon icon={faBold} />
    </Button>
  )
}

export default Bold
