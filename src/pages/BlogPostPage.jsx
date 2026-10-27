import { Link, useParams } from 'react-router-dom'
import { PostActions } from '../components/BlogCard'
import { Async, Loading } from '../components/States'
import { getBlogPost } from '../api'
import useAsync from '../hooks/useAsync'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function BlogPostPage() {
  const { id } = useParams()
  const state = useAsync(() => getBlogPost(id), [id])
  useDocumentTitle(state.data?.title)

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/blog" className="btn-link mb-4">
        → بازگشت به وبلاگ
      </Link>
      <Async state={state} skeleton={<Loading />}>
        {(post) => (
          <>
            <img src={post.image_url} alt="" className="mb-6 h-64 w-full rounded-3xl object-cover sm:h-80" />
            <h1 className="mb-4 text-2xl font-bold leading-relaxed text-ink">{post.title}</h1>
            <div className="flex flex-col gap-4 text-sm leading-loose text-ink/80">
              {post.content.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8 border-t border-surface-blue pt-4">
              <PostActions post={post} />
            </div>
          </>
        )}
      </Async>
    </article>
  )
}
