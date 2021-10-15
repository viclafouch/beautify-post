import React from 'react'
import ReactDOM from 'react-dom'
import Tooltip from './Tooltip/tooltip'

type buildAppOnContainerArgs = {
  onFormat: () => void
  selection: Selection
}

function buildAppOnContainer(
  initialProps: buildAppOnContainerArgs,
  container: Element
) {
  ReactDOM.render(<Tooltip {...initialProps} />, container)
}

export default buildAppOnContainer
