import { useCallback, useEffect, useRef, useState } from 'react'

// Runs an async function and tracks { data, loading, error }.
// Re-runs when `deps` change; ignores results from stale (outdated) calls.
export default function useAsync(fn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null })
  const callId = useRef(0)

  const run = useCallback(() => {
    const id = ++callId.current
    setState((s) => ({ ...s, loading: true, error: null }))
    fn()
      .then((data) => {
        if (id === callId.current) setState({ data, loading: false, error: null })
      })
      .catch((error) => {
        if (id === callId.current) setState({ data: null, loading: false, error })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    run()
    return () => {
      callId.current++ // invalidate in-flight call on unmount/deps change
    }
  }, [run])

  return { ...state, reload: run }
}
