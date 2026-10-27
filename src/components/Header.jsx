import { Link } from 'react-router-dom'
import loginIcon from '../assets/image/login-circle-line.svg'

export default function Header() {
  return (
    <header className="bg-primary/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 text-xs sm:text-sm">
        <p className="text-ink/80">
          ورود به بخش اختصاصی <span className="font-medium text-primary">پزشکان و همکاران درمانی</span>
        </p>
        <Link to="/login?role=doctor" className="btn-soft shadow-sm">
          <img src={loginIcon} alt="" aria-hidden="true" className="h-4 w-4" />
          <span>ورود به بخش</span>
        </Link>
      </div>
    </header>
  )
}
