// Thin fetch wrapper used by the real (FastAPI) backend.
// Set VITE_API_URL in .env (e.g. http://localhost:8000/api/v1) to switch from mock data to the real API.

export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
export const USE_MOCK = !API_URL

const TOKEN_KEY = 'clinify_token'

export const tokenStore = {
  get() {
    try {
      return localStorage.getItem(TOKEN_KEY)
    } catch {
      return null
    }
  },
  set(token) {
    try {
      token ? localStorage.setItem(TOKEN_KEY, token) : localStorage.removeItem(TOKEN_KEY)
    } catch {
      /* storage blocked: session just won't persist */
    }
  },
}

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

// FastAPI returns { detail: "msg" } or { detail: [{ msg, loc }, ...] } for 422 validation errors.
function extractMessage(body, fallback) {
  if (!body) return fallback
  if (typeof body.detail === 'string') return body.detail
  if (Array.isArray(body.detail) && body.detail.length) {
    return body.detail.map((d) => d.msg).join('، ')
  }
  return body.message || fallback
}

export async function request(path, { method = 'GET', body, params, signal } = {}) {
  const url = new URL(`${API_URL}${path}`, window.location.origin)
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v)
    })
  }

  const headers = { Accept: 'application/json' }
  const token = tokenStore.get()
  if (token) headers.Authorization = `Bearer ${token}`
  if (body !== undefined) headers['Content-Type'] = 'application/json'

  let res
  try {
    res = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    })
  } catch (err) {
    if (err.name === 'AbortError') throw err
    throw new ApiError('ارتباط با سرور برقرار نشد. اتصال اینترنت یا آدرس سرور را بررسی کنید.')
  }

  let data = null
  if (res.status !== 204) {
    try {
      data = await res.json()
    } catch {
      data = null
    }
  }

  if (!res.ok) {
    if (res.status === 401) tokenStore.set(null)
    throw new ApiError(extractMessage(data, 'خطایی رخ داد. دوباره تلاش کنید.'), res.status)
  }
  return data
}
