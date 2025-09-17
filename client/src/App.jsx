import react from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainPage from './Admin/MainPage'

function App() {
 

  return (
    <Router>
    <div className='container-fluid flex'>
      <h1>this is h1 tag</h1>
    <MainPage/>
    </div>
    </Router>
  )
}

export default App
