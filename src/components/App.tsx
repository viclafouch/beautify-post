import React from 'react'
import ReactDOM from 'react-dom'
import Tooltip from './Tooltip/tooltip'

type InitialProps = {
  onFormat: () => void
  selection: Selection
}

function buildAppOnContainer(initialProps: InitialProps, container: Element) {
  ReactDOM.render(<Tooltip {...initialProps} />, container)
}

export default buildAppOnContainer
