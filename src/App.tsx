// src/App.tsx

import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import MainContainer from './containers/MainContainer'
import { ThemeProvider } from 'styled-components'
import weatherTheme from './theme/weatherTheme'
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={weatherTheme}>
        <div className="App">
          <MainContainer />
        </div>
      </ThemeProvider>
    </Provider>
  )
}

/* {
  <Provider store={store}>
      <div className="App">
        <UserInfo />
      </div>
  </Provider>
} */
export default App
