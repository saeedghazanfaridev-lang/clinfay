import { Link } from 'react-router-dom'
import hospitalIcon from '../assets/image/hospital_icon.svg'
import locationIcon from '../assets/image/icon_location.svg'
import seedlingIcon from '../assets/image/seedling-line.svg'
import categoriesIcon from '../assets/image/categories.svg'
import { faNum } from '../utils/format'

export default function ClinicCard({ clinic, className = 'w-72 shrink-0 snap-start' }) {
  const to = `/clinics/${clinic.id}`
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-3xl border border-surface-blue bg-white shadow-sm transition hover:shadow-md ${className}`}
    >
      <Link to={to} className="relative block" aria-label={`مشاهده ${clinic.name}`}>
        <img src={clinic.image_url} alt={`تصویر ${clinic.name}`} className="h-40 w-full object-cover" loading="lazy" />
        <div className="absolute inset-x-2 bottom-2 flex items-center gap-2 rounded-xl bg-white/90 px-2.5 py-1.5 backdrop-blur">
          <img src={hospitalIcon} alt="" aria-hidden="true" className="h-4 w-4" />
          <span className="truncate text-xs font-medium text-ink">{clinic.name}</span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-3">
        <div className="flex flex-wrap gap-1">
          {clinic.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-full bg-surface-blue px-2.5 py-1 text-xs text-primary-dark"
            >
              <img src={categoriesIcon} alt="" aria-hidden="true" className="h-3.5 w-3.5" />
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-ink/60">
          <span className="flex items-center gap-1.5">
            <img src={locationIcon} alt="" aria-hidden="true" className="h-3.5 w-3.5" />
            شیراز، {clinic.district}
          </span>
          {clinic.rating != null && (
            <span aria-label={`امتیاز ${faNum(clinic.rating)}`} className="font-medium text-ink/80">
              ★ {faNum(clinic.rating)}
            </span>
          )}
        </div>
        <p className="flex items-center gap-2 rounded-full bg-surface-mint px-2.5 py-2.5 text-right text-xs font-medium text-accent-dark">
          <img src={seedlingIcon} alt="" aria-hidden="true" className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1">{clinic.note}</span>
        </p>
        <Link to={to} className="btn-primary mt-auto w-full">
          مشاهده و رزرو نوبت
        </Link>
      </div>
    </article>
  )
}
