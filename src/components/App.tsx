import React from 'react'
import ReactDOM from 'react-dom'
import Tooltip from './Tooltip/tooltip'

type InitialProps = {
  selection: Selection
}

let previousContainer: null | Element = null

function clearAppContainer(container: Element) {
  ReactDOM.unmountComponentAtNode(container)
  container.remove()
  previousContainer = null
}

function buildAppOnContainer(initialProps: InitialProps, container: Element) {
  if (previousContainer) {
    clearAppContainer(previousContainer)
  }

  const clearCurrentAppContainer = () => {
    clearAppContainer(container as Element)
  }

  ReactDOM.render(
    <Tooltip
      {...initialProps}
      onClickOutside={clearCurrentAppContainer}
      onFormat={clearCurrentAppContainer}
    />,
    container
  )
}

export default buildAppOnContainer
