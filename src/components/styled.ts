import emotionStyled from '@emotion/styled'

/**
 * Emotion is an only ESM module, so we have to handle it both in webpack and jest
 */

// @ts-ignore
const styled: typeof emotionStyled = emotionStyled.default
  ? // @ts-ignore
    emotionStyled.default
  : emotionStyled

export default styled
