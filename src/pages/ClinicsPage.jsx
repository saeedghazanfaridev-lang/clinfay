import { useSearchParams } from 'react-router-dom'
import FilterBox from '../components/FilterBox'
import ClinicCard from '../components/ClinicCard'
import { Async, CardsSkeleton, EmptyBox } from '../components/States'
import { getClinics } from '../api'
import useAsync from '../hooks/useAsync'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { faNum } from '../utils/format'

const PAGE_SIZE = 6
const FILTER_KEYS = ['q', 'specialty', 'district', 'visit_type']

export default function ClinicsPage() {
  useDocumentTitle('کلینیک‌ها و پزشکان')
  const [params, setParams] = useSearchParams()

  const filters = Object.fromEntries(FILTER_KEYS.map((k) => [k, params.get(k) || '']))
  const sort = params.get('sort') || ''
  const page = Math.max(1, Number(params.get('page')) || 1)

  const state = useAsync(
    () => getClinics({ ...filters, sort, page, limit: PAGE_SIZE }),
    // params.toString() changes whenever any filter/sort/page changes
    [params.toString()],
  )

  const update = (changes) => {
    const next = new URLSearchParams(params)
    Object.entries(changes).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)))
    setParams(next)
  }

  const handleSearch = (values) => update({ ...values, page: '' }) // new search -> back to page 1
  const hasFilters = FILTER_KEYS.some((k) => filters[k]) || sort

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-ink">کلینیک‌ها و پزشکان شیراز</h1>
      <FilterBox compact initial={filters} onSubmit={handleSearch} />

      <div className="mb-5 mt-2 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/60" role="status">
          {state.data ? `${faNum(state.data.total)} نتیجه` : ' '}
        </p>
        <div className="flex items-center gap-3">
          {hasFilters && (
            <button type="button" className="btn-link" onClick={() => setParams({})}>
              پاک کردن فیلترها
            </button>
          )}
          <label className="flex items-center gap-2 text-sm text-ink/70">
            مرتب‌سازی:
            <select
              value={sort}
              onChange={(e) => update({ sort: e.target.value, page: '' })}
              className="rounded-xl border border-surface-blue bg-white px-3 py-1.5 text-sm"
            >
              <option value="">پیش‌فرض</option>
              <option value="rating">بیشترین امتیاز</option>
              <option value="reviews">بیشترین نظر</option>
            </select>
          </label>
        </div>
      </div>

      <Async
        state={state}
        skeleton={<CardsSkeleton count={3} className="h-80 flex-1" />}
        isEmpty={(d) => !d?.items?.length}
        emptyText="نتیجه‌ای با این فیلترها پیدا نشد."
      >
        {(data) => {
          const totalPages = Math.max(1, Math.ceil(data.total / PAGE_SIZE))
          return (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.items.map((clinic) => (
                  <ClinicCard key={clinic.id} clinic={clinic} className="w-full" />
                ))}
              </div>
              {totalPages > 1 && (
                <nav className="mt-8 flex items-center justify-center gap-2" aria-label="صفحه‌بندی">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => update({ page: n === 1 ? '' : String(n) })}
                      aria-current={n === page ? 'page' : undefined}
                      className={n === page ? 'btn-primary !px-4' : 'btn-soft !px-4'}
                    >
                      {faNum(n)}
                    </button>
                  ))}
                </nav>
              )}
            </>
          )
        }}
      </Async>
      {!state.loading && !state.error && state.data?.items?.length === 0 && hasFilters && (
        <div className="mt-4">
          <EmptyBox text="فیلترها را تغییر دهید یا آن‌ها را پاک کنید." />
        </div>
      )}
    </div>
  )
}
