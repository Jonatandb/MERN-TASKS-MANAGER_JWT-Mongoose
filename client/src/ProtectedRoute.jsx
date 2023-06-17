import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/useAuth'

export default function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth()

  if(loading) {
    return <h1>Loading...</h1>
  }

  if (!loading && !isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}