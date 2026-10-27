import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function NotFoundPage() {
  useDocumentTitle('صفحه پیدا نشد')
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <p className="text-6xl font-extrabold text-primary">۴۰۴</p>
      <h1 className="mt-4 text-xl font-bold text-ink">صفحه‌ای که دنبالش بودید پیدا نشد</h1>
      <p className="mt-2 text-sm text-ink/60">ممکن است آدرس اشتباه باشد یا صفحه حذف شده باشد.</p>
      <Link to="/" className="btn-primary mt-6">
        بازگشت به صفحه اصلی
      </Link>
    </div>
  )
}
