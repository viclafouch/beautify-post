import React from 'react'
import Bold from '@components/Bold/bold'
import Styled from './tooltip.styled'
import Italic from '@components/Italic/italic'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { replaceSelectedText } from '@helpers/selection'
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

  const formatText = (newText: string) => {
    replaceSelectedText(selection, newText)
    onFormat()
  }

  return (
    <Styled ref={ref}>
      <Bold selection={selection} formatText={formatText} />
      <Italic selection={selection} formatText={formatText} />
      <Clean selection={selection} formatText={formatText} />
    </Styled>
  )
}

export default Tooltip
