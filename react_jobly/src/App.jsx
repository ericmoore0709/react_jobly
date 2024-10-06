import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Navigation from './Navigation'
import SiteRoutes from './SiteRoutes'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navigation />
        <SiteRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
