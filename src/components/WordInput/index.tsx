import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Styled } from './styled'

interface IWordInputProps {
  length: number
  name: string
  disabled?: boolean
}

export const WordInput: FC<IWordInputProps> = ({
  length,
  name,
  disabled = false,
}) => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const letterMap: undefined[] = useMemo(
    () => new Array(length).fill(undefined),
    [length]
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: current },
    } = e
    setValue(current.substring(0, length).replace(/[^а-яё]/gm, ''))
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
        {letterMap.map((_, index) => (
          <Styled.Letter key={index}>
            {value[index] !== undefined ? value[index] : '\u00a0'}
          </Styled.Letter>
        ))}
      </Styled.Letters>
    </Styled.WordInputWrapper>
  )
}
