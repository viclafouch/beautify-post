import React from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import Bold from '@components/Bold/bold'
import Clean from '@components/Clean/clean'
import Italic from '@components/Italic/italic'
import Uppercase from '@components/Uppercase/uppercase'
import { css } from '@emotion/css'

type TooltipProps = {
  selection: Selection
  onFormat: () => void
  clearTooltip: () => void
}

const classNames = {
  root: css`
    display: inline-flex;
  `
}

const Tooltip = (props: TooltipProps): React.ReactElement => {
  const { selection, onFormat, clearTooltip } = props
  const ref = useDetectClickOutside({
    onTriggered: clearTooltip
  })

  return (
    <div ref={ref} className={classNames.root}>
      <Bold selection={selection} onFormat={onFormat} />
      <Italic selection={selection} onFormat={onFormat} />
      <Clean selection={selection} onFormat={onFormat} />
      <Uppercase selection={selection} onFormat={onFormat} />
    </div>
  )
}

export default Tooltip
