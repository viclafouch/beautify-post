import React from 'react'
import Bold from '@components/Bold/bold'
import Styled from './tooltip.styled'
import Italic from '@components/Italic/italic'
import { useDetectClickOutside } from 'react-detect-click-outside'
import Clean from '@components/Clean/clean'

type TooltipProps = {
  close?: () => void
  selection: Selection
  onFormat: () => void
  clearTooltip: () => void
}

const Tooltip = (props: TooltipProps): React.ReactElement => {
  const { selection, onFormat, clearTooltip } = props
  const ref = useDetectClickOutside({
    onTriggered: clearTooltip
  })

  return (
    <Styled ref={ref}>
      <Bold selection={selection} onFormat={onFormat} />
      <Italic selection={selection} onFormat={onFormat} />
      <Clean selection={selection} onFormat={onFormat} />
    </Styled>
  )
}

export default Tooltip
