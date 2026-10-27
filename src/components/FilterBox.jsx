import { useEffect, useState } from 'react'
import searchIcon from '../assets/image/Search.svg'
import imageSearch from '../assets/image/image-search.svg'
import { getFilters } from '../api'
import useAsync from '../hooks/useAsync'

function FilterSelect({ label, value, onChange, options, allLabel, disabled }) {
  return (
    <label className="flex min-w-[9.5rem] flex-1 cursor-pointer flex-col gap-0.5 rounded-2xl px-4 py-2.5 transition hover:bg-surface-blue/60">
      <span className="text-xs text-ink/50">{label}</span>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer appearance-none bg-transparent text-sm font-medium text-ink focus:outline-none"
      >
        <option value="">{allLabel}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  )
}

/**
 * Controlled by `initial` (e.g. values from the URL) and reports a submit via `onSubmit(values)`.
 * Options come from the API (GET /meta/filters).
 */
export default function FilterBox({ initial = {}, onSubmit, compact = false }) {
  const filters = useAsync(() => getFilters(), [])
  const opts = filters.data || { specialties: [], districts: [], visit_types: [] }

  const [values, setValues] = useState({ q: '', specialty: '', district: '', visit_type: '', ...initial })

  // keep the form in sync when the URL changes (back/forward buttons)
  useEffect(() => {
    setValues({ q: '', specialty: '', district: '', visit_type: '', ...initial })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial.q, initial.specialty, initial.district, initial.visit_type])

  const set = (key) => (val) => setValues((v) => ({ ...v, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...values, q: values.q.trim() })
  }

  return (
    <section className={`mx-auto max-w-5xl px-4 ${compact ? 'pb-6' : '-mt-2 pb-14'}`}>
      <form
        onSubmit={handleSubmit}
        role="search"
        className="rounded-3xl border border-surface-blue bg-white p-4 shadow-[0_10px_40px_-15px_rgba(93,123,213,0.25)] sm:p-6"
      >
        <div className="mb-4 flex items-center gap-2">
          <img src={searchIcon} alt="" aria-hidden="true" className="h-5 w-5" />
          <h2 className="font-medium text-ink">جست‌وجوی پزشک یا کلینیک</h2>
        </div>

        <input
          type="search"
          value={values.q}
          onChange={(e) => set('q')(e.target.value)}
          placeholder="نام پزشک، کلینیک یا خدمت (مثلاً ایمپلنت)"
          aria-label="جست‌وجو بر اساس نام"
          className="input mb-3"
        />

        <div className="flex flex-col gap-2 divide-y divide-surface-blue sm:flex-row sm:items-center sm:divide-x-reverse sm:divide-y-0">
          <FilterSelect
            label="تخصص"
            value={values.specialty}
            onChange={set('specialty')}
            options={opts.specialties}
            allLabel="همه تخصص‌ها"
            disabled={filters.loading}
          />
          <FilterSelect
            label="منطقه (شیراز)"
            value={values.district}
            onChange={set('district')}
            options={opts.districts}
            allLabel="همه مناطق"
            disabled={filters.loading}
          />
          <FilterSelect
            label="نوع ویزیت"
            value={values.visit_type}
            onChange={set('visit_type')}
            options={opts.visit_types}
            allLabel="همه انواع ویزیت"
            disabled={filters.loading}
          />
          <button type="submit" className="btn-primary mt-2 shrink-0 sm:mt-0">
            <img src={imageSearch} alt="" aria-hidden="true" className="h-4 w-4" />
            جست‌وجو
          </button>
        </div>
        {filters.error && (
          <p role="alert" className="mt-3 text-xs text-red-600">
            بارگذاری گزینه‌های فیلتر ناموفق بود. جست‌وجوی متنی همچنان کار می‌کند.
          </p>
        )}
      </form>
    </section>
  )
}
