import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Navigation from './Navigation'
import RoutesList from './RoutesList'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <div className='main-container'>
      <BrowserRouter>
        <Navigation />
        <RoutesList />
      </BrowserRouter>
    </div>
  )
}

export default App
