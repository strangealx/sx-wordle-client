import React, { FC, FormEvent, useMemo, useEffect } from 'react'
import { WordInput } from '../WordInput'
import ArrowIcon from '../../assets/icons/arrow.component.svg'
import { useGame } from '../../hooks'
import { Styled } from './styled'

interface IGame {
  rounds: number
  wordLength: number
}

export const Game: FC<IGame> = ({ rounds, wordLength }) => {
  const { isLoading, isCompleted, game, startGame, makeGuess } = useGame()
  const roundsMap: undefined[] = useMemo(() => new Array(rounds).fill(undefined), [rounds])

  const { guess = [] } = game ?? {}
  const round = guess.length
  const disabled = isLoading || isCompleted || !game

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const [word] = [...formData.values()] as string[]

    if (word.length !== wordLength) {
      return false
    }

    void makeGuess(word)
  }

  useEffect(() => {
    void startGame()
  }, [])

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
                disabled={disabled || index !== round}
                name={`word-${index}`}
                result={guess[index]?.result}
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
