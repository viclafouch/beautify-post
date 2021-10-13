import React from 'react'
import ReactDOM from 'react-dom'
import Tooltip from './Tooltip/tooltip'

function matchIsClickInside(
  container: Element,
  elementClicked: EventTarget | null
) {
  return (
    elementClicked instanceof HTMLElement && container.contains(elementClicked)
  )
}

function buildAppOnContainer(container: Element) {
  ReactDOM.render(<Tooltip />, container, () => {
    function handleDocumentClick(event: MouseEvent) {
      const hasClickInside = matchIsClickInside(container, event.target)
      if (!hasClickInside) {
        ReactDOM.unmountComponentAtNode(container)
        document.removeEventListener('click', handleDocumentClick, false)
        container.remove()
      }
    }

    document.addEventListener('click', handleDocumentClick, false)
    document.body.appendChild(container)
  })
}

export default buildAppOnContainer
