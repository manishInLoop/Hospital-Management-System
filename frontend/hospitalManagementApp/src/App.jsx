import { AuthProvider, useAuth } from '@/context/AuthContext'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import AdminAppointments from '@/admin/AdminAppointments'
import AdminDashboard from '@/admin/AdminDashboard'
import AdminDoctors from '@/admin/AdminDoctors'
import AdminPatients from '@/admin/AdminPatients'
import Layout from '@/components/layout/Layout'
import DoctorDashboard from '@/doctor/DoctorDashboard'
import DoctorSchedule from '@/doctor/DoctorSchedule'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import PatientBooking from '@/patient/PatientBooking'
import AdminInquiries from '@/admin/AdminInquiries'
import PatientDashboard from '@/patient/PatientDashboard'

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-slate-400 font-medium">Loading...</p>
      </div>
    </div>
  )
}

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!user)   return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/login" replace />
  return children
}

function RoleRedirect() {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!user)                        return <Navigate to="/"                     replace />
  if (user.role === 'ROLE_ADMIN')   return <Navigate to="/admin/dashboard"      replace />
  if (user.role === 'ROLE_DOCTOR')  return <Navigate to="/doctor/dashboard"     replace />
  if (user.role === 'ROLE_PATIENT') return <Navigate to="/patient/dashboard"    replace />
  return <Navigate to="/" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ className: 'font-sans text-sm shadow-lg', duration: 4000 }} />
        <Routes>
          <Route path="/"          element={<LandingPage />} />
          <Route path="/login"     element={<LoginPage />} />
          <Route path="/register"  element={<RegisterPage />} />
          <Route path="/dashboard" element={<RoleRedirect />} />

          <Route path="/admin" element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']}><Layout role="admin" /></ProtectedRoute>}>
            <Route index               element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard"    element={<AdminDashboard />} />
            <Route path="doctors"      element={<AdminDoctors />} />
            <Route path="patients"     element={<AdminPatients />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="inquiries" element={<AdminInquiries />} />
          </Route>

          <Route path="/doctor" element={<ProtectedRoute allowedRoles={['ROLE_DOCTOR']}><Layout role="doctor" /></ProtectedRoute>}>
            <Route index            element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="schedule"  element={<DoctorSchedule />} />
          </Route>

          <Route path="/patient" element={<ProtectedRoute allowedRoles={['ROLE_PATIENT']}><Layout role="patient" /></ProtectedRoute>}>
            <Route index            element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<PatientDashboard />} />
            <Route path="book"      element={<PatientBooking />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}