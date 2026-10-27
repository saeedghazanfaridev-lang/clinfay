import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import ClinicsPage from './pages/ClinicsPage'
import ClinicDetailPage from './pages/ClinicDetailPage'
import AuthPage from './pages/AuthPage'
import AppointmentsPage from './pages/AppointmentsPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="clinics" element={<ClinicsPage />} />
        <Route path="clinics/:id" element={<ClinicDetailPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:id" element={<BlogPostPage />} />
        <Route path="login" element={<AuthPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="appointments" element={<AppointmentsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
