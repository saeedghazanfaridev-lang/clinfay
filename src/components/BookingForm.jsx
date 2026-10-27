import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { createAppointment, getSlots } from '../api'
import { useAuth } from '../context/AuthContext'
import useAsync from '../hooks/useAsync'
import { formatJalali, formatTime, toIso } from '../utils/format'

const DAYS_AHEAD = 14

function nextDays() {
  return Array.from({ length: DAYS_AHEAD }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i + 1)
    return toIso(d)
  })
}

export default function BookingForm({ clinic }) {
  const { user, ready } = useAuth()
  const location = useLocation()
  const days = useMemo(nextDays, [])

  const [date, setDate] = useState(days[0])
  const [time, setTime] = useState('')
  const [visitType, setVisitType] = useState(clinic.visit_types[0] || '')
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [booked, setBooked] = useState(null)

  const slots = useAsync(() => getSlots(clinic.id, date), [clinic.id, date])

  // a different day has different free slots -> clear the previous choice
  useEffect(() => setTime(''), [date])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!time) return setError('لطفاً یک ساعت انتخاب کنید.')
    setSubmitting(true)
    try {
      const appt = await createAppointment({ clinic_id: clinic.id, date, time, visit_type: visitType, note: note.trim() })
      setBooked(appt)
    } catch (err) {
      setError(err.message)
      if (err.status === 409) {
        setTime('')
        slots.reload() // someone else took the slot: refresh the list
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (booked) {
    return (
      <div role="status" className="rounded-3xl border border-accent/40 bg-surface-mint p-6 text-center">
        <p className="text-lg font-bold text-accent-dark">نوبت شما ثبت شد ✓</p>
        <p className="mt-2 text-sm text-ink/70">
          {formatJalali(booked.date)} ساعت {formatTime(booked.time)} — {booked.visit_type}
        </p>
        <Link to="/appointments" className="btn-primary mt-4">
          مشاهده نوبت‌های من
        </Link>
      </div>
    )
  }

  if (ready && !user) {
    return (
      <div className="rounded-3xl border border-surface-blue bg-white p-6 text-center">
        <p className="text-sm text-ink/70">برای رزرو نوبت ابتدا وارد حساب کاربری خود شوید.</p>
        <Link to="/login" state={{ from: location.pathname }} className="btn-primary mt-4">
          ورود / ثبت‌نام
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5 rounded-3xl border border-surface-blue bg-white p-5 sm:p-6">
      <h2 className="text-lg font-bold text-ink">رزرو نوبت</h2>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-ink/70">تاریخ</span>
        <select value={date} onChange={(e) => setDate(e.target.value)} className="input">
          {days.map((d) => (
            <option key={d} value={d}>
              {formatJalali(d)}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1.5 text-sm text-ink/70">ساعت</legend>
        {slots.loading && <p className="text-xs text-ink/50">در حال دریافت ساعت‌های خالی…</p>}
        {slots.error && (
          <p role="alert" className="text-xs text-red-600">
            {slots.error.message}{' '}
            <button type="button" onClick={slots.reload} className="underline">
              تلاش دوباره
            </button>
          </p>
        )}
        {slots.data && slots.data.slots.length === 0 && (
          <p className="text-xs text-ink/60">برای این روز ساعت خالی وجود ندارد. روز دیگری را انتخاب کنید.</p>
        )}
        <div className="flex flex-wrap gap-2">
          {slots.data?.slots.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={time === t}
              onClick={() => setTime(t)}
              className={time === t ? 'btn-primary !px-4 !py-2' : 'btn-outline !px-4 !py-2'}
            >
              {formatTime(t)}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1.5 text-sm text-ink/70">نوع ویزیت</legend>
        <div className="flex flex-wrap gap-4">
          {clinic.visit_types.map((v) => (
            <label key={v} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="visit_type"
                value={v}
                checked={visitType === v}
                onChange={() => setVisitType(v)}
                className="accent-primary"
              />
              {v}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-ink/70">توضیح برای پزشک (اختیاری)</span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={300}
          rows={3}
          className="input resize-none"
          placeholder="مثلاً علت مراجعه"
        />
      </label>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={submitting || !time} className="btn-primary">
        {submitting ? 'در حال ثبت…' : 'تأیید و ثبت نوبت'}
      </button>
    </form>
  )
}
