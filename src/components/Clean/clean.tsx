import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemoveFormat } from '@fortawesome/free-solid-svg-icons'
import Button from '@components/Button/button'
import { formatSelectionByType } from '@helpers/selection'
import { FormatType } from '@constants/format-type'

type CleanProps = {
  selection: Selection
  onFormat: () => void
}

const Clean = (props: CleanProps): React.ReactElement => {
  const { selection, onFormat } = props

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    formatSelectionByType(selection, FormatType.normal)
    onFormat()
  }

  return (
    <Button aria-label="Clean" type="button" onClick={handleClick}>
      <FontAwesomeIcon icon={faRemoveFormat} />
    </Button>
  )
}

export default Clean
