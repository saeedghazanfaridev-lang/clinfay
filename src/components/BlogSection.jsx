import { Link } from 'react-router-dom'
import BlogCard from './BlogCard'
import { Async, CardsSkeleton } from './States'
import { getBlogPosts } from '../api'
import useAsync from '../hooks/useAsync'

export default function BlogSection() {
  const state = useAsync(() => getBlogPosts(), [])
  return (
    <section id="blog" className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink">مطالب وبلاگ کلینیفای</h2>
        <Link to="/blog" className="btn-link">
          همه مطالب
        </Link>
      </div>
      <Async
        state={state}
        skeleton={<CardsSkeleton count={3} className="h-80 flex-1" />}
        isEmpty={(d) => !d?.items?.length}
        emptyText="هنوز مطلبی منتشر نشده است."
      >
        {(data) => (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </Async>
    </section>
  )
}
