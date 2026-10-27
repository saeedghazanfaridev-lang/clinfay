import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'

// New route -> scroll to top; "/#faq" style links -> scroll to that element.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // Sections above the target load data asynchronously and change the page height,
      // so re-align a few times; stop early if the user scrolls by themselves.
      let tries = 0
      const stop = () => clearInterval(timer)
      const timer = setInterval(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'auto' })
        if (++tries >= 14) stop()
      }, 150)
      window.addEventListener('wheel', stop, { once: true })
      window.addEventListener('touchmove', stop, { once: true })
      return () => {
        stop()
        window.removeEventListener('wheel', stop)
        window.removeEventListener('touchmove', stop)
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-surface text-ink">
      <ScrollManager />
      <Header />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
