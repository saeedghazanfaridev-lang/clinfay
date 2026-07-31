import hospitalIcon from '../assets/image/hospital_icon.svg'
import locationIcon from '../assets/image/icon_location.svg'
import { icons } from '../data/content'

export default function ClinicCard({ clinic, className = 'w-72 shrink-0 snap-start' }) {
  return (
    <article className={`flex flex-col overflow-hidden rounded-3xl border border-surface-blue bg-white shadow-sm ${className}`}>
      <div className="relative">
        <img src={clinic.image} alt={`تصویر ${clinic.name}`} className="h-40 w-72 object-cover" loading="lazy" />
        <div className="absolute inset-x-2 bottom-2 flex items-center gap-2 rounded-xl bg-white/90 px-2.5 py-1.5 backdrop-blur">
          <img src={hospitalIcon} alt="" aria-hidden="true" className="h-4 w-4" />
          <span className="truncate text-xs font-medium text-ink">{clinic.name}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-2">
        <div className="flex  gap-1">
          {clinic.tags.map((tag) => (
            <span
              key={tag.label}
              className="flex items-center gap-1 rounded-full bg-surface-blue px-2.5 py-1 text-xs text-primary-dark"
            >
              <img src={tag.icon} alt="" aria-hidden="true" className="h-3.5 w-3.5" />
              {tag.label}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-ink/60">
          <img src={locationIcon} alt="" aria-hidden="true" className="h-3.5 w-3.5" />
          {clinic.location}
        </div>
        <button className="mt-auto flex items-center gap-2 rounded-full bg-surface-mint px-2.5 py-2.5 text-right text-xs font-medium text-accent-dark transition hover:bg-accent/20 active:scale-[0.98]">
          <img src={icons.seedlingIcon} alt="" aria-hidden="true" className="h-4 w-4" />
          {clinic.note}
        </button>
      </div>
    </article>
  )
}
