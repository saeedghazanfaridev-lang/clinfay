const faqs = [
  {
    q: 'چطور نوبت بگیرم؟',
    a: 'پزشک یا کلینیک را از بخش کلینیک‌ها پیدا کنید، روی «مشاهده و رزرو نوبت» بزنید، تاریخ و ساعت خالی را انتخاب کنید و رزرو را تأیید کنید. برای رزرو لازم است وارد حساب خود شده باشید.',
  },
  {
    q: 'آیا می‌توانم نوبت را لغو کنم؟',
    a: 'بله. از بخش «نوبت‌های من» می‌توانید نوبت‌های فعال خود را مشاهده و لغو کنید.',
  },
  {
    q: 'تفاوت ویزیت حضوری، آنلاین و تلفنی چیست؟',
    a: 'در ویزیت حضوری به مرکز مراجعه می‌کنید. ویزیت آنلاین از طریق تماس تصویری و مشاوره تلفنی از طریق تماس صوتی انجام می‌شود. هر پزشک فقط انواعی را که ارائه می‌دهد نمایش می‌دهد.',
  },
  {
    q: 'ویزیت آنلاین برای چه مواردی مناسب است؟',
    a: 'پیگیری نتیجه‌ی آزمایش، مشاوره‌ی اولیه و کنترل‌های دوره‌ای. در شرایط اورژانسی یا نیاز به معاینه‌ی فیزیکی، حتماً حضوری مراجعه کنید.',
  },
  {
    q: 'اطلاعات من چطور نگهداری می‌شود؟',
    a: 'فقط اطلاعاتی که برای ثبت‌نام و رزرو نوبت لازم است (نام و شماره موبایل) دریافت می‌شود و رمز عبور به‌صورت رمزنگاری‌شده ذخیره می‌گردد.',
  },
]

export default function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-10">
      <h2 className="mb-6 text-lg font-bold text-ink">سوالات متداول</h2>
      <div className="flex flex-col gap-3">
        {faqs.map((item) => (
          <details key={item.q} className="group rounded-2xl border border-surface-blue bg-white p-4 open:shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-ink">
              {item.q}
              <span aria-hidden="true" className="text-primary transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
