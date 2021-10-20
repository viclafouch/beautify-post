import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemoveFormat } from '@fortawesome/free-solid-svg-icons'
import Button from '@components/Button/button'
import { formatNormal } from '@helpers/string'

type CleanProps = {
  selection: Selection
  formatText: (newText: string) => void
}

const Clean = (props: CleanProps): React.ReactElement => {
  const { selection, formatText } = props
  const currentText = selection.toString()

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    const normalText = formatNormal(currentText)
    formatText(normalText)
  }

  return (
    <Button type="button" onClick={handleClick}>
      <FontAwesomeIcon icon={faRemoveFormat} />
    </Button>
  )
}

export default Clean
