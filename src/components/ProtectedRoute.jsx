import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loading } from './States'

// Pages inside this route need a logged-in user; others are sent to /login and returned afterwards.
export default function ProtectedRoute() {
  const { user, ready } = useAuth()
  const location = useLocation()
  if (!ready) return <Loading />
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return <Outlet />
}
