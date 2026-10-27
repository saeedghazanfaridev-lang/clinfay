import heroIllustration from '../assets/image/Asset-1-2.svg'

export default function Hero() {
  return (
    <section id="home" className="mx-auto max-w-6xl px-4 pb-10 pt-6">
      <div className="flex flex-col items-center gap-8 lg:flex-row-reverse lg:items-center lg:justify-between">
        <div className="w-full max-w-md lg:w-1/2">
          <img src={heroIllustration} alt="تصویرسازی پزشک و بیمار کلینیفای" className="mx-auto w-full" />
        </div>
        <div className="w-full text-center lg:w-1/2 lg:text-right">
          <span className="mb-4 inline-block rounded-full bg-surface-mint px-4 py-1.5 text-sm font-medium text-accent-dark">
            کلینیفای
          </span>
          <h1 className="text-2xl font-bold leading-relaxed text-ink sm:text-3xl lg:text-4xl">
            در جست‌وجوی <span className="text-primary">بهترین پزشکان و کلینیک‌های تخصصی شیراز</span> هستید؟
          </h1>
          <p className="mt-3 text-sm text-ink/60 sm:text-base">
            کلینیفای، پلتفرم جست‌وجو و نوبت‌دهی آنلاین پزشکان در شهر شیراز
          </p>
        </div>
      </div>
    </section>
  )
}
