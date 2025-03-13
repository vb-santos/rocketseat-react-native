import { ThemeProvider } from 'styled-components';

import theme from './src/theme';

import Groups from "@screens/Groups";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Groups />
    </ThemeProvider>
  )
}

export default App