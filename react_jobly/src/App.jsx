import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Navigation from './Navigation'
import RoutesList from './RoutesList'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navigation />
        <RoutesList />
      </BrowserRouter>
    </>
  )
}

export default App
