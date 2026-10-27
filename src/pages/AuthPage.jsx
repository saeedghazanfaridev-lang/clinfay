import { useState } from 'react'
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { isValidIranMobile, toEnDigits } from '../utils/format'

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-ink/70">{label}</span>
      {children}
      {error && (
        <span role="alert" className="text-xs text-red-600">
          {error}
        </span>
      )}
    </label>
  )
}

function validate(mode, v) {
  const e = {}
  if (mode === 'register' && v.name.trim().length < 3) e.name = 'نام و نام خانوادگی را وارد کنید (حداقل ۳ حرف).'
  if (!isValidIranMobile(v.phone)) e.phone = 'شماره موبایل معتبر نیست (مثلاً 09123456789).'
  if (v.password.length < 8) e.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد.'
  if (mode === 'register' && v.password !== v.confirm) e.confirm = 'تکرار رمز عبور مطابقت ندارد.'
  return e
}

export default function AuthPage() {
  useDocumentTitle('ورود / ثبت‌نام')
  const { user, ready, login, register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()

  const [mode, setMode] = useState('login')
  const [values, setValues] = useState({ name: '', phone: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const redirectTo = location.state?.from || '/'
  if (ready && user) return <Navigate to={redirectTo} replace />

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setServerError('')
    const errs = validate(mode, values)
    setErrors(errs)
    if (Object.keys(errs).length) return

    setSubmitting(true)
    try {
      const phone = toEnDigits(values.phone).trim()
      if (mode === 'login') await login({ phone, password: values.password })
      else await register({ name: values.name.trim(), phone, password: values.password })
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setServerError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const switchMode = (m) => {
    setMode(m)
    setErrors({})
    setServerError('')
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-3xl border border-surface-blue bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex rounded-full bg-surface-blue p-1" role="tablist">
          {[
            ['login', 'ورود'],
            ['register', 'ثبت‌نام'],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={mode === key}
              onClick={() => switchMode(key)}
              className={`flex-1 rounded-full py-2 text-sm font-medium transition ${
                mode === key ? 'bg-white text-primary shadow-sm' : 'text-ink/60'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {params.get('role') === 'doctor' && (
          <p className="mb-4 rounded-xl bg-surface-lilac px-3 py-2 text-xs leading-relaxed text-primary-dark">
            پنل اختصاصی پزشکان به‌زودی فعال می‌شود. فعلاً می‌توانید به‌عنوان مراجعه‌کننده وارد شوید.
          </p>
        )}
        {location.state?.from && (
          <p className="mb-4 rounded-xl bg-surface-mint px-3 py-2 text-xs text-accent-dark">
            برای ادامه ابتدا وارد حساب خود شوید.
          </p>
        )}

        <form onSubmit={submit} noValidate className="flex flex-col gap-4">
          {mode === 'register' && (
            <Field label="نام و نام خانوادگی" error={errors.name}>
              <input value={values.name} onChange={set('name')} autoComplete="name" className="input" />
            </Field>
          )}
          <Field label="شماره موبایل" error={errors.phone}>
            <input
              value={values.phone}
              onChange={set('phone')}
              inputMode="numeric"
              autoComplete="tel"
              dir="ltr"
              placeholder="09123456789"
              className="input text-left"
            />
          </Field>
          <Field label="رمز عبور" error={errors.password}>
            <input
              type="password"
              value={values.password}
              onChange={set('password')}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              dir="ltr"
              className="input text-left"
            />
          </Field>
          {mode === 'register' && (
            <Field label="تکرار رمز عبور" error={errors.confirm}>
              <input
                type="password"
                value={values.confirm}
                onChange={set('confirm')}
                autoComplete="new-password"
                dir="ltr"
                className="input text-left"
              />
            </Field>
          )}

          {serverError && (
            <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
              {serverError}
            </p>
          )}

          <button type="submit" disabled={submitting} className="btn-primary mt-1">
            {submitting ? 'لطفاً صبر کنید…' : mode === 'login' ? 'ورود' : 'ساخت حساب'}
          </button>
        </form>
      </div>
    </div>
  )
}
