import avatar from '../assets/image/image8.png'
import lineIcon from '../assets/image/line.svg'

const testimonials = [
  {
    id: 1,
    name: 'سارا احمدی',
    text: 'نوبت‌دهی بسیار ساده و آسان بود و به‌راحتی توانستم از طریق سایت، نوبت خودم را آنلاین رزرو کنم.',
  },
  {
    id: 2,
    name: 'محمد رضایی',
    text: 'برای مشکل پوستی‌ام از کلینیفای استفاده کردم. رزرو نوبت سریع بود و بعد از ویزیت، مشاوره‌ی کاملی درباره‌ی روند درمان گرفتم و پیگیری هم ادامه داشت.',
  },
  {
    id: 3,
    name: 'نگین کریمی',
    text: 'برای ویزیت فرزندم دنبال متخصص اطفال بودم؛ با فیلتر تخصص و شهر خیلی سریع کلینیک مناسب رو پیدا کردم.',
  },
]

function TestimonialCard({ item }) {
  return (
    <article className="flex flex-col gap-3 rounded-3xl border border-surface-blue bg-white p-5">
      <div className="flex items-center gap-3">
        <img src={avatar} alt="" aria-hidden="true" className="h-10 w-10 rounded-full object-cover" />
        <span className="text-sm font-medium text-ink">{item.name}</span>
      </div>
      <p className="text-sm leading-relaxed text-ink/60">{item.text}</p>
    </article>
  )
}

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center gap-2">
        <h2 className="text-lg font-bold text-ink">نظرات کاربران</h2>
        <img src={lineIcon} alt="" aria-hidden="true" className="h-2 w-8" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {testimonials.map((item) => (
          <TestimonialCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
