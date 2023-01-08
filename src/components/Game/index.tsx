import React, { FC, FormEvent, useMemo, useEffect } from 'react'
import { WordInput } from '../WordInput'
import ArrowIcon from '../../assets/icons/arrow.component.svg'
import { EGameActionType, useGame } from '../../hooks'
import { Styled } from './styled'

interface IGame {
  rounds: number
  wordLength: number
}

export const Game: FC<IGame> = ({ rounds, wordLength }) => {
  const { isLoading, isError, game, dispatch } = useGame()
  const roundsMap: undefined[] = useMemo(() => new Array(rounds).fill(undefined), [rounds])
  const { id: gameId, guess = [], isCompleted } = game ?? {}
  const round = guess.length
  const disabled = isError || isLoading || !game || isCompleted

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const [word] = [...formData.values()] as string[]

    if (word.length !== wordLength) {
      return false
    }

    void dispatch({ type: EGameActionType.GUESS, payload: { id: gameId ?? 0, guess: word } })
  }

  useEffect(() => {
    void dispatch({ type: EGameActionType.START })
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <Styled.FormContent>
        {
          !isCompleted && (
            <Styled.ArrowRight index={round}>
              <ArrowIcon color="#fff" />
            </Styled.ArrowRight>
          )
        }
        <div>
          {roundsMap.map((_, index) => (
            <Styled.WordWrapper key={index}>
              <WordInput
                length={wordLength}
                disabled={disabled ?? index !== round}
                name={`word-${index}`}
                result={guess[index]?.result}
              />
            </Styled.WordWrapper>
          ))}
        </div>
        {
          !isCompleted && (
            <Styled.ArrowLeft index={round}>
              <ArrowIcon color="#fff" />
            </Styled.ArrowLeft>
          )
        }
      </Styled.FormContent>
      <input type="submit" hidden />
    </form>
  )
}
