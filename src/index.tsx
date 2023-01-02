import React, { FC } from 'react'
import { createRoot } from 'react-dom/client'
import { Normalize } from 'styled-normalize'
import { GlobalStyle } from './globalStyles'
import { App } from './components/App'
import { AppProvider } from './contexts'

const Root: FC = () => (
  <>
    <Normalize />
    <GlobalStyle />
    <AppProvider>
      <App />
    </AppProvider>
  </>
)

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<Root />)
