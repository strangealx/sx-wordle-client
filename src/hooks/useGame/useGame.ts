import { Dispatch, useCallback, useMemo, useReducer } from 'react'
import { Game } from '../../api/generated'
import { useApi } from '../useApi'
import { initialState, reducer } from './reducer'
import { TGameAction, EGameActionType } from './types'

type TUseGame = () => {
  isLoading: boolean
  isError: boolean
  dispatch: (action: TGameAction) => Promise<void>
  game?: Game
}

export const useGame: TUseGame = () => {
  const { createNewGame, makeGuess: tryGuess, getGameById } = useApi()
  const wrapAsync = useCallback((dispatch: Dispatch<TGameAction>) => async (action: TGameAction) => {
    const { type } = action

    if (![EGameActionType.GUESS, EGameActionType.RESUME, EGameActionType.START].includes(type)) {
      return dispatch(action)
    }

    dispatch({ type: EGameActionType.FETCH_INIT })

    try {
      let result: { data: Game } | null = null

      switch (type) {
        case EGameActionType.GUESS: {
          const { payload: { id, guess } } = action
          result = await tryGuess(id, { guess })
          break
        }
        case EGameActionType.START:
          result = await createNewGame()
          break
        case EGameActionType.RESUME: {
          const { payload } = action
          result = await getGameById(Number(payload?.id))
          break
        }
        default:
          dispatch({ type: EGameActionType.FETCH_ERROR })
      }

      if (result) {
        dispatch({ type: EGameActionType.FETCH_SUCCESS, payload: { game: result.data } })
      }
    } catch (error) {
      dispatch({ type: EGameActionType.FETCH_ERROR })
    }
  }, [tryGuess, createNewGame, getGameById])
  const [state, dispatchBase] = useReducer(reducer, initialState)
  const dispatch = useMemo(() => wrapAsync(dispatchBase), [wrapAsync])
  const { isLoading, isError, game } = state
  const output = {
    isLoading,
    isError,
    dispatch
  }

  if (game) {
    const { guess, ...restGame } = game

    return {
      ...output,
      game: {
        ...restGame,
        guess: guess.sort(({ id: aId }, { id: bId }) => aId - bId)
      }
    }
  }

  return output
}
