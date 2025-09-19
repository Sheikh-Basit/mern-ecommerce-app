import react from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainPage from './Admin/MainPage'

function App() {
 

  return (
    <Router>
    <div className='container-fluid flex'>
      <h1>This is just for testing</h1>
    <MainPage/>
    </div>
    </Router>
  )
}

export default App
