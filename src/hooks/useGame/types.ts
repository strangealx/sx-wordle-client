import { Game, Guess } from '../../api/generated'

export enum EGameActionType {
  GUESS,
  START,
  RESUME,
  FETCH_INIT,
  FETCH_SUCCESS,
  FETCH_ERROR
}

export interface IGameState {
  isError: boolean
  isLoading: boolean
  game: Game | null
}

interface IGameGuessAction {
  type: EGameActionType.GUESS
  payload: Guess & {
    id: Game['id']
  }
}

interface IGameResumeAction {
  type: EGameActionType.RESUME
  payload: {
    id: Game['id']
  }
}

interface IGameSetGameAction {
  type: EGameActionType.FETCH_SUCCESS
  payload: {
    game: Game
  }
}

interface IGameSimpleAction {
  type: EGameActionType.FETCH_ERROR | EGameActionType.FETCH_INIT | EGameActionType.START
}

export type TGameAction = IGameGuessAction | IGameResumeAction | IGameSimpleAction | IGameSetGameAction
