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

function buildAppOnContainer(
  initialProps: InitialProps,
  container: Element,
  onClear?: () => void
) {
  if (previousContainer) {
    clearAppContainer(previousContainer)
    onClear?.()
  }

  const clearCurrentAppContainer = () => {
    clearAppContainer(container as Element)
    onClear?.()
  }

  ReactDOM.render(
    <Tooltip
      {...initialProps}
      clearTooltip={clearCurrentAppContainer}
      onFormat={clearCurrentAppContainer}
    />,
    container
  )
}

export default buildAppOnContainer
