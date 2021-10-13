import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold } from '@fortawesome/free-solid-svg-icons'
import Button from '@components/Button/button'

const Bolder = () => {
  const handleClick = () => {
    // const textBold = formatBold(selectedText)
    // range.deleteContents()
    // range.insertNode(document.createTextNode(textBold))
    console.log('click')
  }

  return (
    <Button type="button" onClick={handleClick}>
      <FontAwesomeIcon icon={faBold} />
    </Button>
  )
}

export default Bolder
