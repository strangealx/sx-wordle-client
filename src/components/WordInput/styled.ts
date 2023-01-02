import styled, { css, keyframes } from 'styled-components'

const pulse = (rotate: number) => keyframes`
  0% {
    transform: rotate(0deg) scale(1, 1);
  }

  50% {
    transform: rotate(${rotate}deg) scale(1.1, 1.1);
  }

  75% {
    transform: rotate(${rotate * -1}deg) scale(0.9, 0.9);
  }

  100% {
    transform: rotate(0deg) scale(1, 1);
  }
`

const WordInputWrapper = styled.div`
  position: relative;
`

const Letters = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  cursor: pointer;
  perspective: 1000px;
`

const LetterSide = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 3px;
  text-align: center;
  text-transform: uppercase;
  transition: border-color 0.3s, transform 0.5s ease;
  backface-visibility: hidden;
`

const LetterFront = styled(LetterSide)`
  border: 0.125rem solid #3a3a3c;
  transform: rotateY(0turn);
`

const LetterBack = styled(LetterSide)`
  transform: rotateY(0.5turn);
`

interface ILetter {
  withValue: boolean
  exists: boolean
  inPosition: boolean
  hasInput: boolean
  delay: number
}

const Letter = styled.div<ILetter>`
  position: relative;
  width: calc(1.5em + 0.125rem * 2);
  height: calc(1.5em + 0.125rem * 2);
  font-size: 2em;
  ${({ hasInput }) =>
    hasInput &&
    css`
      animation: ${pulse(5)} 0.2s linear;
    `}

  &:nth-child(odd) {
    ${({ hasInput }) =>
      hasInput &&
      css`
        animation: ${pulse(-5)} 0.2s linear;
      `}
  }

  &:not(:last-child) {
    margin-right: 0.25rem;
  }

  ${LetterSide} {
    transition: border-color 0.3s, transform 0.3s ${({ delay }) => delay}ms ease;
  }

  ${({ withValue, exists, inPosition }) =>
    withValue &&
    `
      ${LetterFront} {
        transform: rotateY(-0.5turn);
      }

      ${LetterBack} {
        transform: rotateY(0turn);
        background-color: ${inPosition ? '#538d4e' : exists ? '#b59f3b' : '#3a3a3c'}
      }
    `}
`

const Input = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  border-radius: unset;
  border: unset;
  padding: 0;
  margin: 0;
  background-color: transparent;
  outline: unset;
  color: transparent;
  user-select: none;
  pointer-events: none;
  opacity: 0;

  &:focus {
    user-select: none;

    & + ${Letters} {
      cursor: default;

      ${LetterFront} {
        border-color: #fff;
      }
    }
  }

  &:disabled {
    & + ${Letters} {
      cursor: default;
    }
  }
`

export const Styled = {
  WordInputWrapper,
  Input,
  Letters,
  Letter,
  LetterFront,
  LetterBack
}
