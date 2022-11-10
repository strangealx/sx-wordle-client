import React, { FC, FormEvent, useMemo, useState } from 'react'
import { WordInput } from '../WordInput'
import ArrowIcon from '../../assets/icons/arrow.component.svg'
import { Styled } from './styled'

interface IGame {
  rounds: number
  wordLength: number
}

export const Game: FC<IGame> = ({ rounds, wordLength }) => {
  const [round, setRound] = useState(0)
  const roundsMap: undefined[] = useMemo(
    () => new Array(rounds).fill(undefined),
    [rounds]
  )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const [word] = [...formData.values()] as string[]

    if (word.length !== wordLength) {
      return false
    }

    setRound(Math.min(round + 1, rounds))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Styled.FormContent>
        <Styled.ArrowRight index={round}>
          <ArrowIcon color="#fff" />
        </Styled.ArrowRight>
        <div>
          {roundsMap.map((_, index) => (
            <Styled.WordWrapper key={index}>
              <WordInput
                length={wordLength}
                disabled={index !== round}
                name={`word-${index}`}
              />
            </Styled.WordWrapper>
          ))}
        </div>
        <Styled.ArrowLeft index={round}>
          <ArrowIcon color="#fff" />
        </Styled.ArrowLeft>
      </Styled.FormContent>
      <input type="submit" hidden />
    </form>
  )
}
