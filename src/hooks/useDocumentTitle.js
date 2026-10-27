import { useEffect } from 'react'

const BASE = 'کلینیفای'

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : `${BASE} | جست‌وجو و نوبت‌دهی آنلاین پزشکان`
  }, [title])
}
