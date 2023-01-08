import { EGameActionType, IGameState, TGameAction } from './types'

export const initialState: IGameState = {
  isError: false,
  isLoading: false,
  game: null
}

export const reducer = (state: IGameState, action: TGameAction): IGameState => {
  const { type } = action

  switch (type) {
    case EGameActionType.FETCH_INIT:
      return { ...state, isLoading: true, isError: false }
    case EGameActionType.FETCH_SUCCESS: {
      const { payload } = action
      return { ...state, ...payload, isLoading: false }
    }
    case EGameActionType.FETCH_ERROR:
    default:
      return { ...state, isLoading: false, isError: true }
  }
}
