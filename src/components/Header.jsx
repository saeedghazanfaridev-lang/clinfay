import loginIcon from '../assets/image/login-circle-line.svg'

export default function Header() {
  return (
    <header className="bg-primary/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 text-xs sm:text-sm">
        <p className="text-ink/80">
          ورود به بخش اختصاصی <span className="font-medium text-primary">پزشکان و همکاران درمانی</span>
        </p>

        <button className="btn-soft shadow-sm shrink-0 whitespace-nowrap">
          <img src={loginIcon} alt="" aria-hidden="true" className="h-4 w-4" />
          <span>ورود به بخش</span>
        </button>
      </div>
    </header>
  )
}