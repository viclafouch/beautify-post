import React from 'react'
import { css } from '@emotion/css'
import Bold from '@components/Bold/bold'
import Italic from '@components/Italic/italic'
import { useDetectClickOutside } from 'react-detect-click-outside'
import Clean from '@components/Clean/clean'

type TooltipProps = {
  close?: () => void
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
    </div>
  )
}

export default Tooltip
