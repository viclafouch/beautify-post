import React from 'react'
import Button from '@components/Button/button'
import { FormatType } from '@constants/format-type'
import { faRemoveFormat } from '@fortawesome/free-solid-svg-icons/faRemoveFormat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatSelectionByType } from '@helpers/selection'

type CleanProps = {
  selection: Selection
  onFormat: () => void
}

const Clean = (props: CleanProps): React.ReactElement => {
  const { selection, onFormat } = props

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
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
