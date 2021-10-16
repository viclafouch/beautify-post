import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faItalic } from '@fortawesome/free-solid-svg-icons'
import Button from '@components/Button/button'
import { matchIsTextIsItalic } from '@helpers/boolean'
import { formatItalic, formatNormal } from '@helpers/format'

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
    if (isTextIsItalic) {
      const textInNormal = formatNormal(currentText)
      formatText(textInNormal)
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
