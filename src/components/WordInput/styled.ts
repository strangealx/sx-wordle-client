import styled from 'styled-components'

const WordInputWrapper = styled.div`
  position: relative;
`

const Letters = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  cursor: pointer;
`

const Letter = styled.div`
  border: 0.125rem solid #3a3a3c;
  border-radius: 3px;
  font-size: 2em;
  width: calc(1.5em + 0.125rem * 2);
  text-align: center;
  text-transform: uppercase;
  transition: border-color 0.3s;

  &:not(:last-child) {
    margin-right: 0.25rem;
  }
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

      ${Letter} {
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
}
