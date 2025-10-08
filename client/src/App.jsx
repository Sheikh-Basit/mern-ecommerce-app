import react from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Alert from './components/Alert';
import Signup from './Pages/Signup';
import AdminDashboard from './Admin/AdminDashboard'
import UserDashboard from './Pages/UserDashboard'
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './Pages/Unauthorized';
import ForgotPassword from './Pages/ForgotPassword';

function App() {


  return (
    <Router>
      <Alert />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/401' element={<Unauthorized />} />
        {/* User Protected Route */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
        </Route>

        {/* Admin Protected Route */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        {/* <Route path='/admin/dashboard' element={<AdminDashboard/>} />
      <Route path='/user/dashboard' element={<UserDashboard/>} /> */}
      </Routes>
    </Router>
  )
}

export default App
