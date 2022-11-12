import { AxiosError, AxiosResponse } from 'axios'
import { useCallback, useState } from 'react'
import { api } from '../api'
import { Game, Guess } from '../api/generated'

export const useGame = (id?: Game['id']) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<AxiosError | Error>()
  const [gameId, setGameId] = useState<Game['id'] | null>(id ?? null)
  const [game, setGame] = useState<Omit<Game, 'id' | 'complete'> | null>(null)

  const handleError = (e: unknown) => {
    if (e instanceof AxiosError || e instanceof Error) {
      setError(e)
      return
    }

    setError(new Error('Unexpected error'))
  }

  const makeGameRequest = useCallback(
    async (promise: Promise<AxiosResponse<Game>>) => {
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
    },
    []
  )

  const resumeGame = useCallback(async (gameId: Game['id']) => {
    try {
      const response = await api.getGameById(gameId)

      return response
    } catch (e) {
      if (e instanceof AxiosError && e.status === 404) {
        return await api.createNewGame()
      }

      throw e
    }
  }, [])

  const startGame = useCallback(async () => {
    try {
      const { complete, id, ...game } = await makeGameRequest(
        gameId ? resumeGame(gameId) : api.createNewGame()
      )

      setGameId(id)
      setGame(game)
      setIsComplete(complete)
    } catch (e) {
      console.error(e)
    }
  }, [gameId, resumeGame, makeGameRequest])

  const makeGuess = useCallback(
    async (guess: Guess['guess']) => {
      if (!gameId) {
        return
      }

      const { complete, id, ...game } = await makeGameRequest(
        api.makeGuess(gameId, { guess })
      )

      setGame(game)
      setIsComplete(complete)
    },
    [gameId, makeGameRequest]
  )

  return {
    error,
    isLoading,
    isComplete,
    game,
    startGame,
    makeGuess
  }
}
