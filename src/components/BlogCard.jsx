import { useState } from 'react'
import { Link } from 'react-router-dom'
import shareIcon from '../assets/image/icon__shear.svg'
import heartIcon from '../assets/image/heart__icon.svg'

const LIKES_KEY = 'clinify_liked_posts'

function readLikes() {
  try {
    return JSON.parse(localStorage.getItem(LIKES_KEY)) || []
  } catch {
    return []
  }
}

// Share: native share sheet when available, otherwise copy the link.
export async function sharePost(post) {
  const url = `${window.location.origin}/blog/${post.id}`
  if (navigator.share) {
    try {
      await navigator.share({ title: post.title, url })
      return 'shared'
    } catch {
      return 'cancelled'
    }
  }
  try {
    await navigator.clipboard.writeText(url)
    return 'copied'
  } catch {
    return 'failed'
  }
}

export function PostActions({ post }) {
  // Likes are stored in this browser only until the backend has a likes endpoint.
  const [liked, setLiked] = useState(() => readLikes().includes(post.id))
  const [msg, setMsg] = useState('')

  const toggleLike = () => {
    const list = readLikes()
    const next = list.includes(post.id) ? list.filter((i) => i !== post.id) : [...list, post.id]
    try {
      localStorage.setItem(LIKES_KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
    setLiked(next.includes(post.id))
  }

  const share = async () => {
    const result = await sharePost(post)
    if (result === 'copied') setMsg('لینک کپی شد')
    else if (result === 'failed') setMsg('کپی لینک ممکن نشد')
    else setMsg('')
    if (result === 'copied' || result === 'failed') setTimeout(() => setMsg(''), 2500)
  }

  return (
    <div className="flex items-center gap-4">
      <button type="button" className="btn-link" onClick={share} aria-label="اشتراک‌گذاری مطلب">
        <img src={shareIcon} alt="" aria-hidden="true" className="h-4 w-4" />
        اشتراک‌گذاری
      </button>
      <button
        type="button"
        className={`btn-link ${liked ? '!text-red-500' : ''}`}
        onClick={toggleLike}
        aria-pressed={liked}
        aria-label={liked ? 'برداشتن پسند' : 'پسندیدن مطلب'}
      >
        <img src={heartIcon} alt="" aria-hidden="true" className={`h-4 w-4 ${liked ? 'opacity-100' : 'opacity-70'}`} />
        {liked ? 'پسندیده شد' : 'پسندیدن'}
      </button>
      <span role="status" className="text-xs text-accent-dark">
        {msg}
      </span>
    </div>
  )
}

export default function BlogCard({ post }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-surface-blue bg-white shadow-sm">
      <Link to={`/blog/${post.id}`} aria-label={post.title}>
        <img src={post.image_url} alt="" className="h-44 w-full object-cover" loading="lazy" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-medium text-ink">
          <Link to={`/blog/${post.id}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-ink/60">{post.summary}</p>
        <Link to={`/blog/${post.id}`} className="text-xs font-medium text-primary hover:underline">
          ادامه مطلب
        </Link>
        <div className="border-t border-surface-blue pt-3">
          <PostActions post={post} />
        </div>
      </div>
    </article>
  )
}
