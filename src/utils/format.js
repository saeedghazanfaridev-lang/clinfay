const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹'
const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩'

// "۰۹۱۲..." or "٠٩١٢..." -> "0912..."
export function toEnDigits(str = '') {
  return String(str).replace(/[۰-۹٠-٩]/g, (d) => {
    const i = FA_DIGITS.indexOf(d)
    return String(i >= 0 ? i : AR_DIGITS.indexOf(d))
  })
}

export const isValidIranMobile = (phone) => /^09\d{9}$/.test(toEnDigits(phone).trim())

export const faNum = (n) => Number(n).toLocaleString('fa-IR')

// Build a Date at local noon from 'YYYY-MM-DD' (avoids UTC off-by-one issues)
function fromIso(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d, 12)
}

export function toIso(date) {
  const p = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`
}

export function formatJalali(iso, opts = { weekday: 'long', day: 'numeric', month: 'long' }) {
  return new Intl.DateTimeFormat('fa-IR-u-ca-persian', opts).format(fromIso(iso))
}

export const formatTime = (t = '') => t.replace(/\d/g, (d) => FA_DIGITS[d])
