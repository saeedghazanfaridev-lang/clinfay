export function CardsSkeleton({ count = 3, className = 'h-72 w-72 shrink-0' }) {
  return (
    <div className="flex gap-4 overflow-hidden" role="status" aria-label="در حال بارگذاری">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`animate-pulse rounded-3xl bg-surface-blue/70 ${className}`} />
      ))}
    </div>
  )
}

export function Loading({ label = 'در حال بارگذاری…' }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-10 text-sm text-ink/60">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      {label}
    </div>
  )
}

export function ErrorBox({ error, onRetry }) {
  return (
    <div role="alert" className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center">
      <p className="text-sm text-red-700">{error?.message || 'خطایی رخ داد.'}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-outline mt-4">
          تلاش دوباره
        </button>
      )}
    </div>
  )
}

export function EmptyBox({ text = 'موردی پیدا نشد.', children }) {
  return (
    <div className="rounded-3xl border border-dashed border-surface-blue bg-white p-8 text-center text-sm text-ink/60">
      <p>{text}</p>
      {children}
    </div>
  )
}

// Renders loading / error / empty / data states for a useAsync() result.
export function Async({ state, skeleton, isEmpty, emptyText, children }) {
  if (state.loading) return skeleton ?? <Loading />
  if (state.error) return <ErrorBox error={state.error} onRetry={state.reload} />
  if (isEmpty?.(state.data)) return <EmptyBox text={emptyText} />
  return children(state.data)
}
