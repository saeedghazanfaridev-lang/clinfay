import hospitalIcon from '../assets/image/hospital_icon.svg'
import healthcareIcon from '../assets/image/Healthcare.svg'
import categoriesIcon from '../assets/image/categories.svg'
import academiaIcon from '../assets/image/Academia.svg'
import seedlingIcon from '../assets/image/seedling-line.svg'

import imageCart5 from '../assets/image/imagecart5.png'
import imageCart6 from '../assets/image/imagecart6.jpg'
import imageCart7 from '../assets/image/imagecart7.jpg'
import imageCart1 from '../assets/image/imaecart1.jpg'
import imageCart2 from '../assets/image/imagecart2.jpg'
import imageCart3 from '../assets/image/imagecart3.jpg'

import actor1 from '../assets/image/image__actor1.png'
import actor2 from '../assets/image/image__actor2.png'
import actor3 from '../assets/image/iamge__actor3.png'

// filter dropdown options
export const specialties = [
  'قلب و عروق',
  'اطفال',
  'پوست و مو',
  'ارتوپدی',
  'زنان و زایمان',
  'داخلی',
  'چشم‌پزشکی',
  'دندان‌پزشکی',
]

export const districts = ['همه مناطق', 'پاسداران', 'معالی‌آباد', 'زند', 'قصرالدشت', 'ستارخان', 'فرهنگ‌شهر']

export const visitTypes = ['حضوری', 'آنلاین (ویدیو کال)', 'مشاوره تلفنی']

// clinic / doctor cards shown in "بهترین مراکز" carousel
export const clinics = [
  {
    id: 1,
    name: 'کلینیک قلب دکتر محمدحسین کمالی',
    image: imageCart5,
    tags: [
      { icon: healthcareIcon, label: 'قلب و عروق' },
      { icon: categoriesIcon, label: 'فوق تخصص' },
    ],
    location: 'شیراز، پاسداران',
    note: 'ویزیت تخصصی، اکوکاردیوگرافی، نوار قلب',
  },
  {
    id: 2,
    name: 'کلینیک دندان‌پزشکی دکتر سارا رضایی',
    image: imageCart6,
    tags: [{ icon: categoriesIcon, label: 'دندان‌پزشکی' }],
    location: 'شیراز، معالی‌آباد',
    note: 'ایمپلنت، ارتودنسی، جرم‌گیری',
  },
  {
    id: 3,
    name: 'کلینیک اطفال دکتر امیر حسینی',
    image: imageCart7,
    tags: [
      { icon: categoriesIcon, label: 'اطفال' },
      { icon: healthcareIcon, label: 'واکسیناسیون' },
      { icon: academiaIcon, label: 'نوزادان' },
    ],
    location: 'شیراز، زند',
    note: 'ویزیت کودک، واکسیناسیون، مشاوره تغذیه',
  },
  {
    id: 4,
    name: 'کلینیک پوست دکتر مریم اکبری',
    image: imageCart1,
    tags: [
      { icon: categoriesIcon, label: 'پوست و مو' },
      { icon: healthcareIcon, label: 'آلرژی' },
      { icon: academiaIcon, label: 'تخصصی' },
    ],
    location: 'شیراز، قصرالدشت',
    note: 'تشخیص و درمان بیماری‌های پوستی',
  },
  {
    id: 5,
    name: 'کلینیک ارتوپدی دکتر رضا نجفی',
    image: imageCart2,
    tags: [{ icon: healthcareIcon, label: 'ارتوپدی' }],
    location: 'شیراز، ستارخان',
    note: 'درمان آسیب‌های استخوان و مفاصل',
  },
  {
    id: 6,
    name: 'کلینیک زنان دکتر نگار شریفی',
    image: imageCart3,
    tags: [{ icon: healthcareIcon, label: 'زنان و زایمان' }],
    location: 'شیراز، فرهنگ‌شهر',
    note: 'مراقبت دوران بارداری و ویزیت تخصصی',
  },
]

// blog posts
export const blogPosts = [
  {
    id: 1,
    image: actor1,
    title: 'چطور پزشک متخصص مناسب پیدا کنیم؟',
    text: 'با فیلتر تخصص، شهر و نوع ویزیت می‌توانید در چند ثانیه پزشک مناسب خود را در کلینیفای پیدا کنید و نوبت آنلاین رزرو کنید.',
  },
  {
    id: 2,
    image: actor2,
    title: 'نوبت‌دهی آنلاین؛ صرفه‌جویی در وقت بیمار',
    text: 'دیگر لازم نیست پشت تلفن منتظر بمانید. از طریق کلینیفای می‌توانید نوبت پزشکان مختلف را به‌صورت آنلاین مشاهده و رزرو کنید.',
  },
  {
    id: 3,
    image: actor3,
    title: 'ویزیت آنلاین چیست و چه زمانی کاربرد دارد؟',
    text: 'برای پیگیری‌های ساده و مشاوره‌های اولیه، ویزیت آنلاین گزینه‌ای سریع و مقرون‌به‌صرفه برای بیماران کلینیفای است.',
  },
]

export const icons = { hospitalIcon, seedlingIcon }
