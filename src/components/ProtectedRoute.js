import {Navigate, Outlet} from 'react-router-dom'

const ProtectedRoute = () => {
  let auth = localStorage.getItem('token')
  if (!auth) {
    return <Navigate to="/login" />
  } else {
    return <Outlet />
  }
}

export default ProtectedRoute
