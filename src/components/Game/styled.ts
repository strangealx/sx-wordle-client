import styled, { keyframes } from 'styled-components'

const slide = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0px);
  }
`

const WordWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 0.25rem;
  }
`

const FormContent = styled.div`
  display: flex;
`

const ArrowRight = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(3rem + 0.125rem * 2);
  margin-right: 12px;
  margin-top: calc(${({ index }) => index} * (3rem + 0.125rem * 4));
  transition: margin-top 0.3s;

  & > * {
    animation: ${slide} 1.5s infinite;
  }
`

const ArrowLeft = styled(ArrowRight)`
  transform: scaleX(-1);
  margin-right: 0;
  margin-left: 12px;
`

export const Styled = {
  WordWrapper,
  FormContent,
  ArrowRight,
  ArrowLeft,
}
