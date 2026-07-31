import logoFooter from '../assets/image/logo-footer.png'
import instagramIcon from '../assets/image/_Instagram.svg'
import whatsappIcon from '../assets/image/_WhatsApp.svg'
import telegramIcon from '../assets/image/_Telegram.svg'

const links = [
  { label: 'صفحه اصلی', href: '#home' },
  { label: 'خدمات', href: '#services' },
  { label: 'کلینیک‌ها', href: '#clinics' },
  { label: 'تعرفه‌ها', href: '#pricing' },
]

const socials = [
  { icon: instagramIcon, label: 'اینستاگرام کلینیفای', href: '#' },
  { icon: whatsappIcon, label: 'واتساپ کلینیفای', href: '#' },
  { icon: telegramIcon, label: 'تلگرام کلینیفای', href: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-surface-blue bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-8 sm:flex-row sm:justify-between">
        <img src={logoFooter} alt="کلینیفای" className="h-9 w-auto" />

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text-sm text-ink/70 transition hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="rounded-full bg-surface-blue p-2 transition hover:bg-primary/20"
            >
              <img src={s.icon} alt="" aria-hidden="true" className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-surface-blue py-4 text-center text-xs text-ink/50">
        کلیه حقوق محفوظ و متعلق به <span className="font-medium text-primary">کلینیفای</span> می‌باشد
      </div>
    </footer>
  )
}
