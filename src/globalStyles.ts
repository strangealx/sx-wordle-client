import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html, body {
    background: #121214;
  }

  html {
    font-family: 'PT Sans', sans-serif;
  }

  body {
    color: #fff;
    line-height: 1.5;
    
  }

  * {
    box-sizing: border-box;
  }
`
