import React from 'react'
import Bold from '@components/Bold/bold'
import Styled from './tooltip.styled'
import Italic from '@components/Italic/italic'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { replaceSelectedText } from '@helpers/selection'

type TooltipProps = {
  close?: () => void
  selection: Selection
  onFormat: () => void
  onClickOutside: () => void
}

const Tooltip = (props: TooltipProps): React.ReactElement => {
  const { selection, onFormat, onClickOutside } = props
  const ref = useDetectClickOutside({ onTriggered: onClickOutside })

  const formatText = (newText: string) => {
    replaceSelectedText(selection, newText)
    onFormat()
  }

  return (
    <Styled ref={ref} id="linkedin-formatter-tooltip">
      <Bold selection={selection} formatText={formatText} />
      <Italic selection={selection} formatText={formatText} />
    </Styled>
  )
}

export default Tooltip
