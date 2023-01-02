import { AxiosError, AxiosResponse } from 'axios'
import { useCallback, useState } from 'react'
import { Game, Guess } from '../api/generated'
import { useApi } from './useApi'

export const useGame = (id?: Game['id']) => {
  const { createNewGame, makeGuess: tryGuess, getGameById } = useApi()
  const [isLoading, setIsLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [error, setError] = useState<AxiosError | Error>()
  const [gameId, setGameId] = useState<Game['id'] | null>(id ?? null)
  const [game, setGame] = useState<Omit<Game, 'id' | 'isCompleted'> | null>(null)

  const handleError = (e: unknown) => {
    if (e instanceof AxiosError || e instanceof Error) {
      setError(e)
      return
    }
    setError(new Error('Unexpected error'))
  }

  const makeGameRequest = useCallback(async (promise: Promise<AxiosResponse<Game>>) => {
    setIsLoading(true)
    try {
      const { data: game } = await promise
      return game
    } catch (e) {
      handleError(e)
      throw e
    } finally {
      setIsLoading(false)
    }
  }, [])
  const resumeGame = useCallback(async (gameId: Game['id']) => {
    try {
      const response = await getGameById(gameId)
      return response
    } catch (e) {
      if (e instanceof AxiosError && e.status === 403) {
        return await createNewGame()
      }
      throw e
    }
  }, [])
  const startGame = useCallback(async () => {
    try {
      const { isCompleted, id, ...game } = await makeGameRequest(gameId ? resumeGame(gameId) : createNewGame())
      setGameId(id)
      setGame(game)
      setIsCompleted(isCompleted)
    } catch (e) {
      console.error(e)
    }
  }, [gameId, resumeGame, makeGameRequest])
  const makeGuess = useCallback(
    async (guess: Guess['guess']) => {
      if (!gameId) {
        return
      }
      const { isCompleted, id, ...game } = await makeGameRequest(tryGuess(gameId, { guess }))
      setGame(game)
      setIsCompleted(isCompleted)
    },
    [gameId, makeGameRequest]
  )
  return {
    error,
    isLoading,
    isCompleted,
    game,
    startGame,
    makeGuess
  }
}
