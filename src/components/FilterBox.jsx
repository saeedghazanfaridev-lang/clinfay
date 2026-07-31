import { useState } from 'react'
import searchIcon from '../assets/image/Search.svg'
import imageSearch from '../assets/image/image-search.svg'
import { specialties, districts, visitTypes } from '../data/content'

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="flex min-w-[9.5rem] flex-1 cursor-pointer flex-col gap-0.5 rounded-2xl px-4 py-2.5 transition hover:bg-surface-blue/60">
      <span className="text-xs text-ink/50">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer appearance-none bg-transparent text-sm font-medium text-ink focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function FilterBox() {
  const [specialty, setSpecialty] = useState(specialties[0])
  const [district, setDistrict] = useState(districts[0])
  const [visitType, setVisitType] = useState(visitTypes[0])

  const handleSearch = (e) => {
    e.preventDefault()
    document.getElementById('clinics')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="mx-auto -mt-2 max-w-5xl px-4 pb-14">
      <form
        onSubmit={handleSearch}
        className="rounded-3xl border border-surface-blue bg-white p-4 shadow-[0_10px_40px_-15px_rgba(93,123,213,0.25)] sm:p-6"
      >
        <div className="mb-4 flex items-center gap-2">
          <img src={searchIcon} alt="" aria-hidden="true" className="h-5 w-5" />
          <h3 className="font-medium text-ink">جست‌وجوی پزشک یا کلینیک</h3>
        </div>
        <div className="flex flex-col gap-2 divide-y divide-surface-blue sm:flex-row sm:items-center sm:divide-x sm:divide-x-reverse sm:divide-y-0">
          <FilterSelect label="تخصص" value={specialty} onChange={setSpecialty} options={specialties} />
          <FilterSelect label="منطقه (شیراز)" value={district} onChange={setDistrict} options={districts} />
          <FilterSelect label="نوع ویزیت" value={visitType} onChange={setVisitType} options={visitTypes} />
          <button type="submit" className="btn-primary mt-2 shrink-0 sm:mt-0">
            <img src={imageSearch} alt="" aria-hidden="true" className="h-4 w-4 " />
            جست‌وجو
          </button>
        </div>
      </form>
    </section>
  )
}
