import { useState } from 'react'
import logoNavbar from '../assets/image/Logo-Navbar.svg'
import hamburgerIcon from '../assets/image/menu-hamnergir.svg'

const links = [
  { label: 'صفحه اصلی', href: '#home', active: false },
  { label: 'وبلاگ', href: '#blog', active: false },
  { label: 'همکاری در فروش', href: '#partners', active: false },
  { label: 'کلینیک‌ها', href: '#clinics', active: true },
  { label: 'وب‌کاتالوگ', href: '#catalog', active: false },
  { label: 'سوالات متداول', href: '#faq', active: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="mx-auto max-w-6xl px-4 py-4">
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
          <a href="#home" className="flex items-center">
            <img src={logoNavbar} alt="لوگوی کلینیفای" className="h-9 w-auto" />
          </a>
        </div>

        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={
                  link.active
                    ? 'font-medium text-primary'
                    : 'text-ink/70 transition hover:text-primary'
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button className="btn-primary hidden shrink-0 shadow-sm sm:inline-flex">
          ثبت‌نام / ورود <span className="opacity-80">مراجعه‌کننده</span>
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="mt-3 flex flex-col gap-1 rounded-2xl border border-surface-blue bg-white p-3 shadow-sm lg:hidden">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={
                link.active
                  ? 'rounded-xl bg-surface-blue px-3 py-2 font-medium text-primary'
                  : 'rounded-xl px-3 py-2 text-ink/70 transition hover:bg-surface-blue'
              }
            >
              {link.label}
            </a>
          ))}
          <button className="btn-primary mt-1 w-full">ثبت‌نام / ورود مراجعه‌کننده</button>
        </div>
      )}
    </nav>
  )
}
