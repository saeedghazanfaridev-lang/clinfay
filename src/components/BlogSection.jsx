import shareIcon from '../assets/image/icon__shear.svg'
import heartIcon from '../assets/image/heart__icon.svg'
import commentIcon from '../assets/image/icon__comment.svg'
import { blogPosts } from '../data/content'

function BlogCard({ post }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-surface-blue bg-white shadow-sm">
      <img src={post.image} alt={post.title} className="h-44 w-full object-cover" loading="lazy" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-medium text-ink">{post.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-ink/60">{post.text}</p>
        <div className="flex items-center gap-4 border-t border-surface-blue pt-3">
          <button className="btn-link" aria-label="اشتراک‌گذاری مطلب">
            <img src={shareIcon} alt="" aria-hidden="true" className="h-4 w-4" />
            اشتراک‌گذاری
          </button>
          <button className="btn-link" aria-label="پسندیدن مطلب">
            <img src={heartIcon} alt="" aria-hidden="true" className="h-4 w-4" />
            پسندیدن
          </button>
          <button className="btn-link" aria-label="نظرات">
            <img src={commentIcon} alt="" aria-hidden="true" className="h-4 w-4" />
            نظرات
          </button>
        </div>
      </div>
    </article>
  )
}

export default function BlogSection() {
  return (
    <section id="blog" className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="mb-6 text-lg font-bold text-ink">مطالب وبلاگ کلینیفای</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
