import './App.css'
import { Header } from './components/header/Header'
import { Main } from './components/main/MainContent'
import { LocalStorageApp } from './app/LocalStorage'

import { store } from './app/store'
import { Provider } from 'react-redux'


function App() {
  return (
    <Provider store={store}>
      <LocalStorageApp />
      <Header />
      <main className='container mt-5'>
        <Main />
      </main>
    </Provider>
  )
}

export default App
