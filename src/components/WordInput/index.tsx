import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GuessResponse } from '../../api/generated'
import { Styled } from './styled'

interface IWordInput {
  length: number
  name: string
  disabled?: boolean
  result?: GuessResponse['result']
}

export const WordInput: FC<IWordInput> = ({ length, name, result, disabled = false }) => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const letterMap: undefined[] = useMemo(() => new Array(length).fill(undefined), [length])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: current }
    } = e
    setValue(current.substring(0, length).replace(/[^a-z]/gm, ''))
  }

  const setFocus = useCallback(() => {
    inputRef?.current?.focus()
  }, [])

  useEffect(() => {
    if (disabled) {
      return
    }

    setFocus()
    inputRef?.current?.addEventListener('blur', setFocus)

    return () => {
      inputRef?.current?.removeEventListener('blur', setFocus)
    }
  }, [disabled, setFocus])

  return (
    <Styled.WordInputWrapper>
      <Styled.Input
        ref={inputRef}
        name={name}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        spellCheck="false"
        autoComplete="off"
      />
      <Styled.Letters>
        {letterMap.map((_, index) => {
          const { exists = false, position = false } = result?.[index] ?? {}
          const hasInput = value[index] !== undefined
          const char = hasInput ? value[index] : '\u00a0'

          return (
            <Styled.Letter
              key={index}
              withValue={Boolean(result?.[index])}
              exists={exists}
              inPosition={position}
              hasInput={hasInput}
              delay={200 * index}
            >
              <Styled.LetterFront>{char}</Styled.LetterFront>
              <Styled.LetterBack>{char}</Styled.LetterBack>
            </Styled.Letter>
          )
        })}
      </Styled.Letters>
    </Styled.WordInputWrapper>
  )
}
