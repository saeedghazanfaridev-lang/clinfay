import BlogCard from '../components/BlogCard'
import { Async, CardsSkeleton } from '../components/States'
import { getBlogPosts } from '../api'
import useAsync from '../hooks/useAsync'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function BlogPage() {
  useDocumentTitle('وبلاگ')
  const state = useAsync(() => getBlogPosts(), [])
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-ink">مطالب وبلاگ کلینیفای</h1>
      <Async
        state={state}
        skeleton={<CardsSkeleton count={3} className="h-80 flex-1" />}
        isEmpty={(d) => !d?.items?.length}
        emptyText="هنوز مطلبی منتشر نشده است."
      >
        {(data) => (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </Async>
    </div>
  )
}
