import React from 'react'
import Bold from '@components/Bold/bold'
import Styled from './tooltip.styled'
import Italic from '@components/Italic/italic'
import { replaceSelectedText } from '@helpers/selection'

type TooltipProps = {
  onFormat: () => void
  selection: Selection
}

const Tooltip = (props: TooltipProps): React.ReactElement => {
  const { selection, onFormat } = props

  const formatText = (newText: string) => {
    replaceSelectedText(selection, newText)
    onFormat()
  }

  return (
    <Styled>
      <Bold selection={selection} formatText={formatText} />
      <Italic />
    </Styled>
  )
}

export default Tooltip
