import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    background-color: ${({ theme }) => theme.palette.background};
    color: ${({ theme }) => theme.palette.contrastText};
  }

  html,
  body,
  #root {
    min-height: 100vh;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #root {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  button {
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h1 {
    font-size: 32px;
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  }

  h2 {
    font-size: 24px;
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  }

  h3 {
    font-size: 20px;
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  }

  h4 {
    font-size: 16px;
  }
`;
