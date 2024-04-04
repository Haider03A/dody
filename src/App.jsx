import './App.css'
import { Header } from './components/header/Header'
import { Main } from './components/main/MainContent'

function App() {
  return (
    <>
      <Header />
      <main className='container mt-5'>
        <Main />
      </main>
    </>
  )
}

export default App
