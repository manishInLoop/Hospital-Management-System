import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export const authAPI = {
  login:    (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
}

export const adminAPI = {
  getStats:       ()     => api.get('/admin/stats'),
  getDoctors:     ()     => api.get('/admin/doctors'),
  registerDoctor: (data) => api.post('/admin/doctors', data),
  deleteDoctor:   (id)   => api.delete(`/admin/doctors/${id}`),
  getPatients:    ()     => api.get('/admin/patients'),
  deletePatient:  (id)   => api.delete(`/admin/patients/${id}`),
}

export const appointmentAPI = {
  book:              (data)           => api.post('/appointments/book', data),
  getPatientAppts:   (patientId)      => api.get(`/appointments/patient/${patientId}`),
  getDoctorSchedule: (doctorId, date) => api.get(`/doctors/${doctorId}/schedule?date=${date}`),
  updateStatus:      (id, status)     => api.patch(`/appointments/${id}/status?status=${status}`),
}

export const doctorAPI = {
  getAll:  ()    => api.get('/doctors'),
  getById: (id)  => api.get(`/doctors/${id}`),
}

export default api