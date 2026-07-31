import { useRef } from 'react'
import frameIcon from '../assets/image/Frame-4564.svg'
import arrowLeft from '../assets/image/arrow-left.svg'
import arrowRight from '../assets/image/arrow-right.svg'
import ClinicCard from './ClinicCard'
import { clinics } from '../data/content'

export default function BestCenters() {
  const scrollerRef = useRef(null)

  const scrollByCard = (direction) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: direction * 300, behavior: 'smooth' })
  }

  return (
    <section id="clinics" className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-5 flex items-center justify-between">
        <img src={frameIcon} alt="بهترین مراکز درمانی" className="h-6 w-auto" />
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="مرکز قبلی"
            onClick={() => scrollByCard(1)}
            className="btn-icon"
          >
            <img src={arrowRight} alt="" aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="مرکز بعدی"
            onClick={() => scrollByCard(-1)}
            className="btn-icon"
          >
            <img src={arrowLeft} alt="" aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div ref={scrollerRef} className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2">
        {clinics.map((clinic) => (
          <ClinicCard key={clinic.id} clinic={clinic} />
        ))}
      </div>
    </section>
  )
}
