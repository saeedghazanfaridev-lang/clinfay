import { Link } from 'react-router-dom'
import starIcon from '../assets/image/iconstar.svg'
import counselingIcon from '../assets/image/icon.svg'
import calendarIcon from '../assets/image/iconcalander.svg'
import searchIcon from '../assets/image/icon-search-.svg'
import arrowLeftIcon from '../assets/image/arrow-left-icon.svg'
import polygon from '../assets/image/Polygon-1.svg'

const features = [
  {
    icon: counselingIcon,
    title: 'مشاوره آنلاین',
    text: 'در خانه خود از بهترین متخصصان مشاوره تصویری بگیرید',
    cta: 'مشاهده پزشکان آنلاین',
    to: `/clinics?visit_type=${encodeURIComponent('آنلاین (ویدیو کال)')}`,
  },
  {
    icon: calendarIcon,
    title: 'نوبت‌دهی سریع',
    text: 'در چند کلیک نوبت حضوری یا آنلاین خود را رزرو کنید',
    cta: 'رزرو نوبت',
    to: '/clinics',
  },
  {
    icon: searchIcon,
    title: 'جست‌وجوی هوشمند',
    text: 'بر اساس تخصص، منطقه و امتیاز، پزشک مناسب را پیدا کنید',
    cta: 'جست‌وجوی پزشک',
    to: '/clinics?sort=rating',
  },
]

function FeatureCard({ feature }) {
  return (
    <div className="flex flex-1 items-center gap-4 rounded-3xl border border-surface-blue bg-white p-5">
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
        <img src={polygon} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full" />
        <img src={feature.icon} alt="" aria-hidden="true" className="relative h-15 w-20" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-ink">{feature.title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-ink/60">{feature.text}</p>
        <Link to={feature.to} className="btn-link mt-2 !text-primary">
          {feature.cta}
          <img src={arrowLeftIcon} alt="" aria-hidden="true" className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}

export default function ServicesBanner() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <img src={starIcon} alt="" aria-hidden="true" className="h-4 w-4" />
          <h2 className="text-sm font-medium text-primary">خدمات کلینیفای</h2>
        </div>
        <h3 className="text-xl font-bold text-ink sm:text-2xl">خدمات حرفه‌ای پزشکی برای شما</h3>
        <p className="mx-auto max-w-xl text-sm text-ink/60">
          از مشاوره آنلاین تا رزرو نوبت حضوری، کلینیفای مسیر رسیدن به پزشک مناسب را ساده می‌کند.
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        {features.map((f) => (
          <FeatureCard key={f.title} feature={f} />
        ))}
      </div>
    </section>
  )
}
