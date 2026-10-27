# قرارداد API (برای نوشتن بک‌اند FastAPI)

فرانت دقیقاً همین آدرس‌ها و فیلدها را انتظار دارد. وقتی بک‌اند آماده شد، فقط در فایل `.env` بنویسید:

```
VITE_API_URL=http://localhost:8000/api/v1
```

(اگر `VITE_API_URL` خالی باشد، فرانت از داده‌ی آزمایشی داخل `src/api/mockData.js` استفاده می‌کند.)

> همه‌ی فیلدها `snake_case` هستند. همه‌ی پاسخ‌ها JSON هستند.
> فایل‌های مرجع: `src/api/index.js` (فراخوانی‌ها) و `src/api/mockData.js` (نمونه‌ی دقیق پاسخ‌ها).

## قواعد عمومی

- **احراز هویت:** هدر `Authorization: Bearer <access_token>`. توکن در `localStorage` ذخیره می‌شود. این یک تصمیم فعلی فرانت است و باید هنگام طراحی احراز هویت واقعی از نظر ریسک XSS و گزینه‌ی کوکی HttpOnly بررسی شود.
- **خطاها:** فرمت پیش‌فرض FastAPI یعنی `{ "detail": "پیام فارسی" }` یا لیست خطاهای 422. پیام `detail` مستقیم به کاربر نشان داده می‌شود، پس **فارسی بنویسید**.
- **CORS:** دامنه‌ی فرانت (`http://localhost:5173` و دامنه‌ی production) باید با تنظیم محدود و صریح مجاز باشد.
- کد 401 یعنی توکن نامعتبر؛ فرانت توکن را پاک می‌کند.

## Endpoints

### فیلترها
`GET /meta/filters`
```json
{ "specialties": ["قلب و عروق", "اطفال"], "districts": ["پاسداران", "زند"], "visit_types": ["حضوری", "آنلاین (ویدیو کال)", "مشاوره تلفنی"] }
```

### کلینیک‌ها
`GET /clinics` — پارامترهای اختیاری (همه با هم قابل ترکیب):

| پارامتر | توضیح |
|---|---|
| `specialty`, `district`, `visit_type` | تطابق دقیق با مقادیر `/meta/filters` |
| `q` | جست‌وجوی متنی در نام کلینیک/پزشک/تخصص/خدمات |
| `sort` | `rating` یا `reviews` |
| `featured=true` | کلینیک‌های بخش «بهترین مراکز» صفحه‌ی اصلی |
| `suggested=true` | کلینیک‌های بخش «مراکز پیشنهادی» |
| `page` (از ۱)، `limit` | صفحه‌بندی (فرانت `limit=6` می‌فرستد) |

پاسخ: `{ "items": [Clinic], "total": 9 }` — `total` تعداد **کل نتایج قبل از صفحه‌بندی** است.

`GET /clinics/{id}` → یک `Clinic` یا 404 با `detail`.

**Clinic**
```json
{
  "id": 1,
  "name": "کلینیک قلب دکتر محمدحسین کمالی",
  "doctor_name": "دکتر محمدحسین کمالی",
  "specialty": "قلب و عروق",
  "tags": ["قلب و عروق", "فوق تخصص"],
  "district": "پاسداران",
  "address": "شیراز، بلوار پاسداران ...",
  "phone": "071-30000001",
  "image_url": "https://.../clinic1.jpg",
  "note": "ویزیت تخصصی، اکوکاردیوگرافی",
  "description": "متن توضیح",
  "rating": 4.8,
  "reviews_count": 124,
  "visit_types": ["حضوری", "آنلاین (ویدیو کال)"],
  "working_hours": "شنبه تا چهارشنبه ۹ الی ۱۷"
}
```
(`featured` و `suggested` فقط برای فیلتر سمت سرور لازم‌اند و لازم نیست در پاسخ باشند.)

### ساعت‌های خالی
`GET /clinics/{id}/slots?date=YYYY-MM-DD` (تاریخ **میلادی**)
```json
{ "slots": ["09:00", "09:30", "16:00"] }
```
فقط ساعت‌های **رزروشده‌نشده** را برگردانید.

### نظرات و وبلاگ
- `GET /reviews?limit=3` → `{ "items": [{ "id", "author_name", "text", "rating" }], "total" }`
- `GET /blog` → `{ "items": [{ "id", "title", "summary", "image_url", "created_at" }], "total" }`
- `GET /blog/{id}` → همان فیلدها + `"content"` (پاراگراف‌ها با یک خط خالی `\n\n` جدا می‌شوند)

### احراز هویت
- `POST /auth/register` بدنه: `{ "name", "phone", "password" }` → `{ "access_token": "...", "user": { "id", "name", "phone", "role" } }`
  - شماره تکراری → **409** با `detail`
- `POST /auth/login` بدنه: `{ "phone", "password" }` → همان پاسخ بالا. اشتباه → **401** با `detail`
- `GET /auth/me` → `{ "id", "name", "phone", "role" }` (نیاز به توکن)

اعتبارسنجی فرانت: موبایل `^09\d{9}$` (ارقام فارسی قبل از ارسال به انگلیسی تبدیل می‌شوند)، رمز حداقل ۸ کاراکتر. **اعتبارسنجی سمت سرور هم الزامی است.**

### نوبت‌ها (همه نیازمند توکن)
- `POST /appointments` بدنه: `{ "clinic_id", "date": "YYYY-MM-DD", "time": "HH:MM", "visit_type", "note" }`
  → `Appointment`. اگر ساعت پر شده بود **409** با `detail` (فرانت لیست ساعت‌ها را دوباره می‌گیرد).
- `GET /appointments/me` → `{ "items": [Appointment], "total" }` (جدیدترین اول)
- `POST /appointments/{id}/cancel` → `Appointment` با `status: "cancelled"`. فقط نوبت خود کاربر.

**Appointment**
```json
{ "id": 5, "clinic_id": 3, "clinic_name": "...", "date": "2026-11-02", "time": "09:30",
  "visit_type": "حضوری", "note": "", "status": "confirmed" }
```
`status` یکی از: `pending`, `confirmed`, `cancelled`, `done`.

## نکات امنیتی که سمت بک‌اند با شماست
- هش رمز با bcrypt/argon2؛ هرگز رمز را در پاسخ برنگردانید.
- جلوگیری از رزرو همزمان یک ساعت: قید داده‌بیس مناسب و تراکنش؛ قید ساده‌ی `UNIQUE(clinic_id, date, time)` باید با سیاست لغو/فعال بودن نوبت‌ها سازگار شود.
- بررسی مالکیت نوبت در لغو؛ rate limit روی `/auth/login`.
