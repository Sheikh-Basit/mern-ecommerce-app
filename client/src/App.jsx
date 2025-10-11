import react from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Alert from './components/Alert';
import Signup from './Pages/Signup';
import AdminLayout from './Admin/AdminLayout'
import UserDashboard from './Pages/UserDashboard'
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './Pages/Unauthorized';
import ForgotPassword from './Pages/ForgotPassword';
import Dashboard from './Admin/Dashboard';
import Orders from './Admin/Orders';
import Logout from './Admin/Logout';
import Products from './Admin/Products';

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
          <Route path="/admin" element={<AdminLayout />} >
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="logout" element={<Logout />} />
            <Route path="products" element={<Products />} />
            {/* <Route path="settings" element={<Settings />} /> */}
          </Route>
        </Route>
        {/* <Route path='/admin/dashboard' element={<AdminDashboard/>} />
      <Route path='/user/dashboard' element={<UserDashboard/>} /> */}
      </Routes>
    </Router>
  )
}

export default App
