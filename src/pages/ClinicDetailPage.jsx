import { Link, useParams } from 'react-router-dom'
import BookingForm from '../components/BookingForm'
import { Async, Loading } from '../components/States'
import { getClinic } from '../api'
import useAsync from '../hooks/useAsync'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { faNum } from '../utils/format'

function Info({ label, children }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-2xl bg-surface-blue/50 px-4 py-3">
      <dt className="text-xs text-ink/50">{label}</dt>
      <dd className="text-sm font-medium text-ink">{children}</dd>
    </div>
  )
}

export default function ClinicDetailPage() {
  const { id } = useParams()
  const state = useAsync(() => getClinic(id), [id])
  useDocumentTitle(state.data?.name)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link to="/clinics" className="btn-link mb-4">
        → بازگشت به لیست کلینیک‌ها
      </Link>
      <Async
        state={state}
        skeleton={<Loading label="در حال دریافت اطلاعات کلینیک…" />}
      >
        {(clinic) => (
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="flex flex-col gap-5">
              <img
                src={clinic.image_url}
                alt={`تصویر ${clinic.name}`}
                className="h-64 w-full rounded-3xl object-cover sm:h-80"
              />
              <div>
                <h1 className="text-2xl font-bold text-ink">{clinic.name}</h1>
                <p className="mt-1 text-sm text-ink/60">
                  {clinic.doctor_name} — {clinic.specialty}
                </p>
                {clinic.rating != null && (
                  <p className="mt-2 text-sm text-ink/80">
                    ★ {faNum(clinic.rating)}
                    {clinic.reviews_count != null && (
                      <span className="text-ink/50"> ({faNum(clinic.reviews_count)} نظر)</span>
                    )}
                  </p>
                )}
              </div>
              {clinic.description && <p className="text-sm leading-loose text-ink/70">{clinic.description}</p>}
              <dl className="grid gap-3 sm:grid-cols-2">
                <Info label="آدرس">{clinic.address}</Info>
                <Info label="منطقه">شیراز، {clinic.district}</Info>
                {clinic.phone && (
                  <Info label="تلفن">
                    <a href={`tel:${clinic.phone}`} dir="ltr" className="text-primary">
                      {clinic.phone}
                    </a>
                  </Info>
                )}
                {clinic.working_hours && <Info label="ساعات کاری">{clinic.working_hours}</Info>}
                <Info label="انواع ویزیت">{clinic.visit_types.join('، ')}</Info>
                <Info label="خدمات">{clinic.note}</Info>
              </dl>
            </div>
            <aside className="lg:sticky lg:top-6 lg:self-start">
              <BookingForm clinic={clinic} />
            </aside>
          </div>
        )}
      </Async>
    </div>
  )
}
