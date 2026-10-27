import { Link } from 'react-router-dom'
import logoFooter from '../assets/image/logo-footer.png'
import instagramIcon from '../assets/image/_Instagram.svg'
import whatsappIcon from '../assets/image/_WhatsApp.svg'
import telegramIcon from '../assets/image/_Telegram.svg'
import { SOCIALS } from '../config'

const links = [
  { label: 'صفحه اصلی', to: '/' },
  { label: 'کلینیک‌ها', to: '/clinics' },
  { label: 'وبلاگ', to: '/blog' },
  { label: 'سوالات متداول', to: '/#faq' },
  { label: 'نوبت‌های من', to: '/appointments' },
]

// only socials with a real URL in src/config.js are shown
const socials = [
  { icon: instagramIcon, label: 'اینستاگرام کلینیفای', href: SOCIALS.instagram },
  { icon: whatsappIcon, label: 'واتساپ کلینیفای', href: SOCIALS.whatsapp },
  { icon: telegramIcon, label: 'تلگرام کلینیفای', href: SOCIALS.telegram },
].filter((s) => s.href)

export default function Footer() {
  return (
    <footer className="border-t border-surface-blue bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-8 sm:flex-row sm:justify-between">
        <img src={logoFooter} alt="کلینیفای" className="h-9 w-auto" />

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="لینک‌های پایین صفحه">
          {links.map((link) => (
            <Link key={link.label} to={link.to} className="text-sm text-ink/70 transition hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        {socials.length > 0 && (
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="rounded-full bg-surface-blue p-2 transition hover:bg-primary/20"
              >
                <img src={s.icon} alt="" aria-hidden="true" className="h-4 w-4" />
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="border-t border-surface-blue py-4 text-center text-xs text-ink/50">
        کلیه حقوق محفوظ و متعلق به <span className="font-medium text-primary">کلینیفای</span> می‌باشد
      </div>
    </footer>
  )
}
