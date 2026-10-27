import { useRef } from 'react'
import { Link } from 'react-router-dom'
import frameIcon from '../assets/image/Frame-4564.svg'
import arrowLeft from '../assets/image/arrow-left.svg'
import arrowRight from '../assets/image/arrow-right.svg'
import ClinicCard from './ClinicCard'
import { Async, CardsSkeleton } from './States'
import { getClinics } from '../api'
import useAsync from '../hooks/useAsync'

export default function BestCenters() {
  const scrollerRef = useRef(null)
  const state = useAsync(() => getClinics({ featured: true, sort: 'rating', limit: 8 }), [])

  const scrollByCard = (direction) => {
    scrollerRef.current?.scrollBy({ left: direction * 300, behavior: 'smooth' })
  }

  return (
    <section id="clinics" className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-5 flex items-center justify-between">
        <img src={frameIcon} alt="بهترین مراکز درمانی" className="h-6 w-auto" />
        <div className="flex items-center gap-2">
          <Link to="/clinics" className="btn-link ml-2">
            مشاهده همه
          </Link>
          <button type="button" aria-label="مرکز قبلی" onClick={() => scrollByCard(1)} className="btn-icon">
            <img src={arrowRight} alt="" aria-hidden="true" className="h-4 w-4" />
          </button>
          <button type="button" aria-label="مرکز بعدی" onClick={() => scrollByCard(-1)} className="btn-icon">
            <img src={arrowLeft} alt="" aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Async
        state={state}
        skeleton={<CardsSkeleton count={4} />}
        isEmpty={(d) => !d?.items?.length}
        emptyText="فعلاً مرکزی برای نمایش وجود ندارد."
      >
        {(data) => (
          <div ref={scrollerRef} className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2">
            {data.items.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} />
            ))}
          </div>
        )}
      </Async>
    </section>
  )
}
