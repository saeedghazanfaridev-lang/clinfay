import boxIcon from '../assets/image/image_box.svg'
import lineIcon from '../assets/image/line.svg'
import ClinicCard from './ClinicCard'
import { Async, CardsSkeleton } from './States'
import { getClinics } from '../api'
import useAsync from '../hooks/useAsync'

export default function SuggestedCenters() {
  const state = useAsync(() => getClinics({ suggested: true, limit: 3 }), [])

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col items-stretch gap-4 lg:flex-row">
        <div className="flex shrink-0 flex-col items-center justify-center rounded-3xl bg-accent/10 p-6 text-center lg:w-64">
          <img src={boxIcon} alt="" aria-hidden="true" className="mb-4 h-16 w-auto" />
          <h2 className="text-2xl font-semibold leading-tight text-ink">مراکز</h2>
          <p className="text-3xl font-extrabold leading-tight text-primary">پیشنهادی</p>
          <img src={lineIcon} alt="" aria-hidden="true" className="mt-2 h-2 w-16" />
          <p className="mt-3 text-xs text-ink/60">بر اساس امتیاز و بازخورد بیماران کلینیفای</p>
        </div>

        <div className="flex-1">
          <Async
            state={state}
            skeleton={<CardsSkeleton count={3} className="h-80 flex-1" />}
            isEmpty={(d) => !d?.items?.length}
            emptyText="فعلاً مرکز پیشنهادی وجود ندارد."
          >
            {(data) => (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {data.items.map((clinic) => (
                  <ClinicCard key={clinic.id} clinic={clinic} className="w-full" />
                ))}
              </div>
            )}
          </Async>
        </div>
      </div>
    </section>
  )
}
