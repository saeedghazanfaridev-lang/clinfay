// Seed data used ONLY while VITE_API_URL is empty (no backend yet).
// Field names intentionally match the JSON the real API should return (see API_CONTRACT.md).
import imageCart5 from '../assets/image/imagecart5.png'
import imageCart6 from '../assets/image/imagecart6.jpg'
import imageCart7 from '../assets/image/imagecart4.jpg'
import imageCart1 from '../assets/image/imaecart1.jpg'
import imageCart2 from '../assets/image/imagecart3.jpg'
import imageCart3 from '../assets/image/imagecart3.jpg'
// Reuse image assets already tracked in the repository until the ZIP image files are imported.
import actor1 from '../assets/image/image__actor1.png'
import actor2 from '../assets/image/image__actor2.png'
import actor3 from '../assets/image/iamge__actor3.png'

export const filters = {
  specialties: ['قلب و عروق', 'اطفال', 'پوست و مو', 'ارتوپدی', 'زنان و زایمان', 'داخلی', 'چشم‌پزشکی', 'دندان‌پزشکی'],
  districts: ['پاسداران', 'معالی‌آباد', 'زند', 'قصرالدشت', 'ستارخان', 'فرهنگ‌شهر'],
  visit_types: ['حضوری', 'آنلاین (ویدیو کال)', 'مشاوره تلفنی'],
}

const hours = 'شنبه تا چهارشنبه ۹ الی ۱۷'

export const clinics = [
  {
    id: 1, name: 'کلینیک قلب دکتر محمدحسین کمالی', doctor_name: 'دکتر محمدحسین کمالی',
    specialty: 'قلب و عروق', tags: ['قلب و عروق', 'فوق تخصص'], district: 'پاسداران',
    address: 'شیراز، بلوار پاسداران، ساختمان پزشکان نور، طبقه ۳', phone: '071-30000001',
    image_url: imageCart5, note: 'ویزیت تخصصی، اکوکاردیوگرافی، نوار قلب',
    description: 'فوق تخصص قلب و عروق با بیش از ۱۵ سال سابقه. تشخیص و درمان بیماری‌های عروق کرونر، فشار خون و نارسایی قلبی.',
    rating: 4.8, reviews_count: 124, visit_types: ['حضوری', 'آنلاین (ویدیو کال)'], working_hours: hours, featured: true, suggested: false,
  },
  {
    id: 2, name: 'کلینیک دندان‌پزشکی دکتر سارا رضایی', doctor_name: 'دکتر سارا رضایی',
    specialty: 'دندان‌پزشکی', tags: ['دندان‌پزشکی'], district: 'معالی‌آباد',
    address: 'شیراز، معالی‌آباد، خیابان ۱۰، پلاک ۲۲', phone: '071-30000002',
    image_url: imageCart6, note: 'ایمپلنت، ارتودنسی، جرم‌گیری',
    description: 'خدمات کامل دندان‌پزشکی ترمیمی و زیبایی، ایمپلنت و ارتودنسی با تجهیزات روز.',
    rating: 4.6, reviews_count: 88, visit_types: ['حضوری'], working_hours: hours, featured: true, suggested: false,
  },
  {
    id: 3, name: 'کلینیک اطفال دکتر امیر حسینی', doctor_name: 'دکتر امیر حسینی',
    specialty: 'اطفال', tags: ['اطفال', 'واکسیناسیون', 'نوزادان'], district: 'زند',
    address: 'شیراز، خیابان زند، کوچه ۴، پلاک ۸', phone: '071-30000003',
    image_url: imageCart7, note: 'ویزیت کودک، واکسیناسیون، مشاوره تغذیه',
    description: 'متخصص کودکان و نوزادان؛ پایش رشد، واکسیناسیون و مشاوره تغذیه‌ی کودک.',
    rating: 4.9, reviews_count: 203, visit_types: ['حضوری', 'آنلاین (ویدیو کال)', 'مشاوره تلفنی'],
    working_hours: 'شنبه تا پنجشنبه ۸ الی ۱۴', featured: true, suggested: false,
  },
  {
    id: 4, name: 'کلینیک پوست دکتر مریم اکبری', doctor_name: 'دکتر مریم اکبری',
    specialty: 'پوست و مو', tags: ['پوست و مو', 'آلرژی', 'تخصصی'], district: 'قصرالدشت',
    address: 'شیراز، قصرالدشت، خیابان شهید دستغیب', phone: '071-30000004',
    image_url: imageCart1, note: 'تشخیص و درمان بیماری‌های پوستی',
    description: 'تشخیص و درمان آکنه، اگزما، آلرژی‌های پوستی و ریزش مو.',
    rating: 4.5, reviews_count: 71, visit_types: ['حضوری', 'آنلاین (ویدیو کال)'], working_hours: hours, featured: true, suggested: false,
  },
  {
    id: 5, name: 'کلینیک ارتوپدی دکتر رضا نجفی', doctor_name: 'دکتر رضا نجفی',
    specialty: 'ارتوپدی', tags: ['ارتوپدی'], district: 'ستارخان',
    address: 'شیراز، ستارخان، مجتمع پزشکی شفا', phone: '071-30000005',
    image_url: imageCart2, note: 'درمان آسیب‌های استخوان و مفاصل',
    description: 'درمان آسیب‌های ورزشی، دردهای مفصلی و مشکلات ستون فقرات.',
    rating: 4.4, reviews_count: 56, visit_types: ['حضوری'], working_hours: hours, featured: true, suggested: false,
  },
  {
    id: 6, name: 'کلینیک زنان دکتر نگار شریفی', doctor_name: 'دکتر نگار شریفی',
    specialty: 'زنان و زایمان', tags: ['زنان و زایمان'], district: 'فرهنگ‌شهر',
    address: 'شیراز، فرهنگ‌شهر، بلوار مطهری', phone: '071-30000006',
    image_url: imageCart3, note: 'مراقبت دوران بارداری و ویزیت تخصصی',
    description: 'مراقبت‌های دوران بارداری، سونوگرافی و ویزیت‌های تخصصی بانوان.',
    rating: 4.7, reviews_count: 97, visit_types: ['حضوری', 'مشاوره تلفنی'], working_hours: hours, featured: true, suggested: false,
  },
  // NOTE: these three reuse the existing photos until real clinic images are added.
  {
    id: 7, name: 'کلینیک داخلی دکتر علی محمودی', doctor_name: 'دکتر علی محمودی',
    specialty: 'داخلی', tags: ['داخلی', 'چکاپ'], district: 'پاسداران',
    address: 'شیراز، پاسداران، کوچه ۱۲', phone: '071-30000007',
    image_url: imageCart7, note: 'چکاپ کامل، دیابت و فشار خون',
    description: 'ویزیت داخلی، کنترل دیابت و فشار خون و چکاپ دوره‌ای.',
    rating: 4.6, reviews_count: 64, visit_types: ['حضوری', 'آنلاین (ویدیو کال)'], working_hours: hours, featured: false, suggested: true,
  },
  {
    id: 8, name: 'کلینیک چشم دکتر ندا فرهادی', doctor_name: 'دکتر ندا فرهادی',
    specialty: 'چشم‌پزشکی', tags: ['چشم‌پزشکی', 'لیزیک'], district: 'معالی‌آباد',
    address: 'شیراز، معالی‌آباد، ساختمان بینا', phone: '071-30000008',
    image_url: imageCart1, note: 'معاینه بینایی، لیزیک، آب مروارید',
    description: 'معاینه‌ی کامل چشم، تجویز عینک و جراحی‌های اصلاح بینایی.',
    rating: 4.7, reviews_count: 59, visit_types: ['حضوری'], working_hours: hours, featured: false, suggested: true,
  },
  {
    id: 9, name: 'کلینیک زنان و زایمان دکتر پریسا کاظمی', doctor_name: 'دکتر پریسا کاظمی',
    specialty: 'زنان و زایمان', tags: ['زنان و زایمان', 'نازایی'], district: 'زند',
    address: 'شیراز، خیابان زند، مرکز درمانی مهر', phone: '071-30000009',
    image_url: imageCart3, note: 'مشاوره نازایی و سونوگرافی',
    description: 'مشاوره و درمان ناباروری، سونوگرافی و مراقبت‌های دوران بارداری.',
    rating: 4.8, reviews_count: 110, visit_types: ['حضوری', 'مشاوره تلفنی'], working_hours: hours, featured: false, suggested: true,
  },
]

export const reviews = [
  { id: 1, author_name: 'سارا احمدی', text: 'نوبت‌دهی بسیار ساده و آسان بود و به‌راحتی توانستم از طریق سایت، نوبت خودم را آنلاین رزرو کنم.', rating: 5 },
  { id: 2, author_name: 'محمد رضایی', text: 'برای مشکل پوستی‌ام از کلینیفای استفاده کردم. رزرو نوبت سریع بود و بعد از ویزیت، مشاوره‌ی کاملی درباره‌ی روند درمان گرفتم و پیگیری هم ادامه داشت.', rating: 5 },
  { id: 3, author_name: 'نگین کریمی', text: 'برای ویزیت فرزندم دنبال متخصص اطفال بودم؛ با فیلتر تخصص و شهر خیلی سریع کلینیک مناسب رو پیدا کردم.', rating: 4 },
]

export const blogPosts = [
  {
    id: 1, image_url: actor1, title: 'چطور پزشک متخصص مناسب پیدا کنیم؟',
    summary: 'با فیلتر تخصص، منطقه و نوع ویزیت می‌توانید در چند ثانیه پزشک مناسب خود را در کلینیفای پیدا کنید.',
    content: 'انتخاب پزشک مناسب اولین قدم درمان است. ابتدا مشخص کنید به کدام تخصص نیاز دارید. سپس منطقه‌ی نزدیک به خود و نوع ویزیت (حضوری، آنلاین یا تلفنی) را انتخاب کنید.\n\nدر کلینیفای می‌توانید امتیاز و نظر بیماران قبلی را ببینید و بر اساس آن‌ها تصمیم بگیرید. پیش از رزرو، ساعات کاری و آدرس مرکز را هم بررسی کنید تا در روز ویزیت غافلگیر نشوید.',
    created_at: '2026-07-01',
  },
  {
    id: 2, image_url: actor2, title: 'نوبت‌دهی آنلاین؛ صرفه‌جویی در وقت بیمار',
    summary: 'دیگر لازم نیست پشت تلفن منتظر بمانید. نوبت پزشکان را به‌صورت آنلاین ببینید و رزرو کنید.',
    content: 'رزرو تلفنی معمولاً زمان‌بر است و ممکن است ساعت‌ها طول بکشد. در نوبت‌دهی آنلاین، ساعت‌های خالی پزشک را می‌بینید و همان لحظه نوبت خود را قطعی می‌کنید.\n\nهر نوبت قابل مشاهده و در صورت نیاز قابل لغو است، پس برنامه‌ریزی برایتان ساده‌تر می‌شود.',
    created_at: '2026-07-10',
  },
  {
    id: 3, image_url: actor3, title: 'ویزیت آنلاین چیست و چه زمانی کاربرد دارد؟',
    summary: 'برای پیگیری‌های ساده و مشاوره‌های اولیه، ویزیت آنلاین گزینه‌ای سریع و مقرون‌به‌صرفه است.',
    content: 'ویزیت آنلاین برای پیگیری نتیجه‌ی آزمایش، مشاوره‌های اولیه و کنترل‌های دوره‌ای مناسب است. اما در شرایطی که نیاز به معاینه‌ی فیزیکی یا اورژانس دارید، حتماً حضوری مراجعه کنید.',
    created_at: '2026-07-20',
  },
]
