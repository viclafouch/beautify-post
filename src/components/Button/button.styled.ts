import styled from '@emotion/styled'

type StyledProps = {
  $isSelected: boolean
}

const Styled = styled.button<StyledProps>`
  height: 34px;
  background-color: ${(props): string => {
    return props.$isSelected ? '#eff2f5' : '#ffffff'
  }};
  color: #000000;
  min-width: 24px;
  padding-inline: 5px;
  &:hover {
    background-color: #eff2f5;
  }
`

export default Styled
