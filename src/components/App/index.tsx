import React, { FC } from 'react'
import { Game } from '../Game'
import { GAME_ROUNDS, WORD_LENGTH } from '../../constants'
import { Styled } from './styled'

export const App: FC = () => (
  <Styled.Container>
    <Game rounds={GAME_ROUNDS} wordLength={WORD_LENGTH} />
  </Styled.Container>
)
