import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Async } from '../components/States'
import { cancelAppointment, getMyAppointments } from '../api'
import useAsync from '../hooks/useAsync'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { formatJalali, formatTime } from '../utils/format'

const STATUS = {
  confirmed: { label: 'تأیید شده', cls: 'bg-surface-mint text-accent-dark' },
  pending: { label: 'در انتظار تأیید', cls: 'bg-surface-lilac text-primary-dark' },
  cancelled: { label: 'لغو شده', cls: 'bg-red-50 text-red-600' },
  done: { label: 'انجام شده', cls: 'bg-surface-blue text-primary-dark' },
}

export default function AppointmentsPage() {
  useDocumentTitle('نوبت‌های من')
  const state = useAsync(() => getMyAppointments(), [])
  const [busyId, setBusyId] = useState(null)
  const [error, setError] = useState('')

  const cancel = async (id) => {
    if (!window.confirm('آیا از لغو این نوبت مطمئن هستید؟')) return
    setBusyId(id)
    setError('')
    try {
      await cancelAppointment(id)
      state.reload()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-ink">نوبت‌های من</h1>
      {error && (
        <p role="alert" className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      <Async
        state={state}
        isEmpty={(d) => !d?.items?.length}
        emptyText="هنوز نوبتی ثبت نکرده‌اید."
      >
        {(data) => (
          <ul className="flex flex-col gap-3">
            {data.items.map((a) => {
              const st = STATUS[a.status] || STATUS.pending
              return (
                <li
                  key={a.id}
                  className="flex flex-col gap-3 rounded-3xl border border-surface-blue bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex flex-col gap-1">
                    <Link to={`/clinics/${a.clinic_id}`} className="font-medium text-ink hover:text-primary">
                      {a.clinic_name || `کلینیک ${a.clinic_id}`}
                    </Link>
                    <p className="text-sm text-ink/60">
                      {formatJalali(a.date)} — ساعت {formatTime(a.time)} — {a.visit_type}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${st.cls}`}>{st.label}</span>
                    {(a.status === 'confirmed' || a.status === 'pending') && (
                      <button
                        type="button"
                        className="btn-outline !px-4 !py-1.5"
                        disabled={busyId === a.id}
                        onClick={() => cancel(a.id)}
                      >
                        {busyId === a.id ? 'در حال لغو…' : 'لغو نوبت'}
                      </button>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </Async>
    </div>
  )
}
