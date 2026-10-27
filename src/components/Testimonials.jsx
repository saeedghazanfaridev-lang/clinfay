import lineIcon from '../assets/image/line.svg'
import { Async, CardsSkeleton } from './States'
import { getReviews } from '../api'
import useAsync from '../hooks/useAsync'

const AVATAR_COLORS = ['bg-primary/15 text-primary-dark', 'bg-accent/20 text-accent-dark', 'bg-surface-lilac text-primary-dark']

// Initials avatar: each reviewer looks different without needing a photo from the API.
function Avatar({ name, index }) {
  const initial = (name || '؟').trim().charAt(0)
  return (
    <span
      aria-hidden="true"
      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}
    >
      {initial}
    </span>
  )
}

function TestimonialCard({ item, index }) {
  return (
    <article className="flex flex-col gap-3 rounded-3xl border border-surface-blue bg-white p-5">
      <div className="flex items-center gap-3">
        <Avatar name={item.author_name} index={index} />
        <span className="text-sm font-medium text-ink">{item.author_name}</span>
      </div>
      <p className="text-sm leading-relaxed text-ink/60">{item.text}</p>
    </article>
  )
}

export default function Testimonials() {
  const state = useAsync(() => getReviews({ limit: 3 }), [])
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center gap-2">
        <h2 className="text-lg font-bold text-ink">نظرات کاربران</h2>
        <img src={lineIcon} alt="" aria-hidden="true" className="h-2 w-8" />
      </div>
      <Async
        state={state}
        skeleton={<CardsSkeleton count={3} className="h-32 flex-1" />}
        isEmpty={(d) => !d?.items?.length}
        emptyText="هنوز نظری ثبت نشده است."
      >
        {(data) => (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {data.items.map((item, i) => (
              <TestimonialCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </Async>
    </section>
  )
}
