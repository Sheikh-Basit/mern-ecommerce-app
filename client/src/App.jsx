import react from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';
import Alert from './components/Alert';
import Signup from './Pages/Signup';
import AdminDashboard from './Admin/AdminDashboard'
import UserDashboard from './UserDashboard'

function App() {
 

  return (
    <Router>
      <Alert/>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/admin/dashboard' element={<AdminDashboard/>} />
      <Route path='/user/dashboard' element={<UserDashboard/>} />
    </Routes>
    </Router>
  )
}

export default App
