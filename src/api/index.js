// Single entry point for all data access.
// Components only import from here. When VITE_API_URL is set, every function calls the real backend;
// otherwise it falls back to in-browser mock data, so the UI works before the backend exists.
import { request, ApiError, USE_MOCK, tokenStore } from './client'
import * as mock from './mockData'

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms))

// ---------- tiny localStorage "database" for mock mode ----------
function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

// ---------- meta / filters ----------
export async function getFilters() {
  if (!USE_MOCK) return request('/meta/filters')
  await delay(150)
  return mock.filters
}

// ---------- clinics ----------
export async function getClinics(params = {}) {
  if (!USE_MOCK) return request('/clinics', { params })
  await delay()
  const { specialty, district, visit_type, q, sort, featured, suggested, page = 1, limit = 12 } = params
  let items = [...mock.clinics]
  if (specialty) items = items.filter((c) => c.specialty === specialty)
  if (district) items = items.filter((c) => c.district === district)
  if (visit_type) items = items.filter((c) => c.visit_types.includes(visit_type))
  if (featured) items = items.filter((c) => c.featured)
  if (suggested) items = items.filter((c) => c.suggested)
  if (q) {
    const needle = String(q).trim()
    items = items.filter((c) => [c.name, c.doctor_name, c.specialty, c.note].some((f) => f.includes(needle)))
  }
  if (sort === 'rating') items.sort((a, b) => b.rating - a.rating)
  if (sort === 'reviews') items.sort((a, b) => b.reviews_count - a.reviews_count)
  const total = items.length
  const start = (Number(page) - 1) * Number(limit)
  return { items: items.slice(start, start + Number(limit)), total }
}

export async function getClinic(id) {
  if (!USE_MOCK) return request(`/clinics/${id}`)
  await delay(250)
  const found = mock.clinics.find((c) => String(c.id) === String(id))
  if (!found) throw new ApiError('کلینیک موردنظر پیدا نشد.', 404)
  return found
}

// Free time slots for a given clinic and Gregorian date (YYYY-MM-DD)
export async function getSlots(clinicId, date) {
  if (!USE_MOCK) return request(`/clinics/${clinicId}/slots`, { params: { date } })
  await delay(200)
  const taken = load('clinify_mock_appointments', [])
    .filter((a) => String(a.clinic_id) === String(clinicId) && a.date === date && a.status !== 'cancelled')
    .map((a) => a.time)
  const all = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '16:00', '16:30', '17:00', '17:30']
  return { slots: all.filter((t) => !taken.includes(t)) }
}

// ---------- reviews & blog ----------
export async function getReviews(params = { limit: 3 }) {
  if (!USE_MOCK) return request('/reviews', { params })
  await delay(200)
  return { items: mock.reviews.slice(0, params.limit || 3), total: mock.reviews.length }
}

export async function getBlogPosts() {
  if (!USE_MOCK) return request('/blog')
  await delay(200)
  return { items: mock.blogPosts, total: mock.blogPosts.length }
}

export async function getBlogPost(id) {
  if (!USE_MOCK) return request(`/blog/${id}`)
  await delay(200)
  const post = mock.blogPosts.find((p) => String(p.id) === String(id))
  if (!post) throw new ApiError('مطلب موردنظر پیدا نشد.', 404)
  return post
}

// ---------- auth ----------
export async function register({ name, phone, password }) {
  if (!USE_MOCK) return request('/auth/register', { method: 'POST', body: { name, phone, password } })
  await delay()
  const users = load('clinify_mock_users', [])
  if (users.some((u) => u.phone === phone)) throw new ApiError('این شماره قبلاً ثبت‌نام کرده است.', 409)
  const user = { id: Date.now(), name, phone, password, role: 'patient' }
  save('clinify_mock_users', [...users, user])
  const { password: _pw, ...safe } = user
  return { access_token: `mock-${user.id}`, user: safe }
}

export async function login({ phone, password }) {
  if (!USE_MOCK) return request('/auth/login', { method: 'POST', body: { phone, password } })
  await delay()
  const user = load('clinify_mock_users', []).find((u) => u.phone === phone && u.password === password)
  if (!user) throw new ApiError('شماره موبایل یا رمز عبور اشتباه است.', 401)
  const { password: _pw, ...safe } = user
  return { access_token: `mock-${user.id}`, user: safe }
}

export async function getMe() {
  if (!USE_MOCK) return request('/auth/me')
  const token = tokenStore.get()
  const user = load('clinify_mock_users', []).find((u) => `mock-${u.id}` === token)
  if (!user) throw new ApiError('نشست شما منقضی شده است.', 401)
  const { password: _pw, ...safe } = user
  return safe
}

// ---------- appointments ----------
export async function createAppointment({ clinic_id, date, time, visit_type, note }) {
  if (!USE_MOCK) return request('/appointments', { method: 'POST', body: { clinic_id, date, time, visit_type, note } })
  await delay()
  const me = await getMe()
  const clinic = mock.clinics.find((c) => c.id === Number(clinic_id))
  const list = load('clinify_mock_appointments', [])
  if (list.some((a) => a.clinic_id === Number(clinic_id) && a.date === date && a.time === time && a.status !== 'cancelled')) {
    throw new ApiError('این ساعت قبلاً رزرو شده است. ساعت دیگری انتخاب کنید.', 409)
  }
  const appt = {
    id: Date.now(),
    user_id: me.id,
    clinic_id: Number(clinic_id),
    clinic_name: clinic?.name,
    date,
    time,
    visit_type,
    note: note || '',
    status: 'confirmed',
  }
  save('clinify_mock_appointments', [...list, appt])
  return appt
}

export async function getMyAppointments() {
  if (!USE_MOCK) return request('/appointments/me')
  await delay(250)
  const me = await getMe()
  const items = load('clinify_mock_appointments', [])
    .filter((a) => a.user_id === me.id)
    .sort((a, b) => `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`))
  return { items, total: items.length }
}

export async function cancelAppointment(id) {
  if (!USE_MOCK) return request(`/appointments/${id}/cancel`, { method: 'POST' })
  await delay(200)
  const list = load('clinify_mock_appointments', []).map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a))
  save('clinify_mock_appointments', list)
  return list.find((a) => a.id === id)
}

export { ApiError, USE_MOCK }
