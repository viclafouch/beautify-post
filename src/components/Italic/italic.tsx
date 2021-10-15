import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faItalic } from '@fortawesome/free-solid-svg-icons'
import Button from '@components/Button/button'

const Italic = () => {
  const [isSelected, setIsSelected] = React.useState<boolean>(false)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    setIsSelected(prevState => !prevState)
  }

  return (
    <Button type="button" onClick={handleClick} isSelected={isSelected}>
      <FontAwesomeIcon icon={faItalic} />
    </Button>
  )
}

export default Italic
