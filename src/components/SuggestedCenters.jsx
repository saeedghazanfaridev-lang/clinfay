import boxIcon from '../assets/image/image_box.svg'
import lineIcon from '../assets/image/line.svg'
import ClinicCard from './ClinicCard'
import { clinics } from '../data/content'

export default function SuggestedCenters() {
  const suggested = clinics.slice(2, 5)

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex  items-stretch gap-4 lg:">
        {/* decorative title banner, matches the original site's design */}
        <div className="flex shrink-0 flex-col items-center justify-center rounded-3xl bg-accent/10 p-6 text-center lg:w-64">
          <img src={boxIcon} alt="" aria-hidden="true" className="mb-4 h-16 w-auto" />
          <p className="text-2xl font-semibold leading-tight text-ink">مراکز</p>
          <p className="text-3xl font-extrabold leading-tight text-primary">پیشنهادی</p>
          <img src={lineIcon} alt="" aria-hidden="true" className="mt-2 h-2 w-16" />
          <p className="mt-3 text-xs text-ink/60">بر اساس امتیاز و بازخورد بیماران کلینیفای</p>
        </div>

        {/* clinic cards */}
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
          {suggested.map((clinic) => (
            <ClinicCard key={clinic.id} clinic={clinic} className="w-full" />
          ))}
        </div>
      </div>
    </section>
  )
}
