import React, { FC } from 'react'
import { createRoot } from 'react-dom/client'
import { Normalize } from 'styled-normalize'
import { App } from './components/App'
import { GlobalStyle } from './globalStyles'

const Root: FC = () => (
  <>
    <Normalize />
    <GlobalStyle />
    <App />
  </>
)

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<Root />)
