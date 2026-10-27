import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logoNavbar from '../assets/image/Logo-Navbar.svg'
import hamburgerIcon from '../assets/image/menu-hamnergir.svg'
import { useAuth } from '../context/AuthContext'

const links = [
  { label: 'صفحه اصلی', to: '/', end: true },
  { label: 'کلینیک‌ها', to: '/clinics' },
  { label: 'وبلاگ', to: '/blog' },
  { label: 'سوالات متداول', to: '/#faq', hash: true },
]

const desktopClass = ({ isActive }) =>
  isActive ? 'font-medium text-primary' : 'text-ink/70 transition hover:text-primary'
const mobileClass = ({ isActive }) =>
  isActive
    ? 'rounded-xl bg-surface-blue px-3 py-2 font-medium text-primary'
    : 'rounded-xl px-3 py-2 text-ink/70 transition hover:bg-surface-blue'

function NavItem({ link, className, onClick }) {
  // hash links (/#faq) are plain links: NavLink would mark "/" and "/#faq" active together
  if (link.hash) {
    const base = className({ isActive: false })
    return (
      <Link to={link.to} className={base} onClick={onClick}>
        {link.label}
      </Link>
    )
  }
  return (
    <NavLink to={link.to} end={link.end} className={className} onClick={onClick}>
      {link.label}
    </NavLink>
  )
}

function AuthArea({ onDone, full = false }) {
  const { user, ready, logout } = useAuth()
  const navigate = useNavigate()

  if (!ready) return null
  if (!user) {
    return (
      <Link to="/login" onClick={onDone} className={`btn-primary shrink-0 shadow-sm ${full ? 'mt-1 w-full' : ''}`}>
        ثبت‌نام / ورود <span className="opacity-80">مراجعه‌کننده</span>
      </Link>
    )
  }
  return (
    <div className={`flex items-center gap-2 ${full ? 'mt-1 flex-col items-stretch' : ''}`}>
      <Link to="/appointments" onClick={onDone} className="btn-soft">
        نوبت‌های من
      </Link>
      <button
        type="button"
        className="btn-outline"
        onClick={() => {
          logout()
          onDone?.()
          navigate('/')
        }}
      >
        خروج ({user.name})
      </button>
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname])

  return (
    <nav className="mx-auto max-w-6xl px-4 py-4" aria-label="منوی اصلی">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            className="btn-icon lg:hidden"
            aria-label={open ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <img src={hamburgerIcon} alt="" aria-hidden="true" className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-center">
            <img src={logoNavbar} alt="لوگوی کلینیفای" className="h-9 w-auto" />
          </Link>
        </div>

        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <NavItem link={link} className={desktopClass} />
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <AuthArea />
        </div>
      </div>

      {open && (
        <div className="mt-3 flex flex-col gap-1 rounded-2xl border border-surface-blue bg-white p-3 shadow-sm lg:hidden">
          {links.map((link) => (
            <NavItem key={link.label} link={link} className={mobileClass} onClick={() => setOpen(false)} />
          ))}
          <AuthArea full onDone={() => setOpen(false)} />
        </div>
      )}
    </nav>
  )
}
