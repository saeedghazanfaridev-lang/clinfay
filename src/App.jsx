import Header from './components/Header'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FilterBox from './components/FilterBox'
import BestCenters from './components/BestCenters'
import ServicesBanner from './components/ServicesBanner'
import SuggestedCenters from './components/SuggestedCenters'
import Testimonials from './components/Testimonials'
import BlogSection from './components/BlogSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-surface text-ink">
      <Header />
      <Navbar />
      <Hero />
      <FilterBox />
      <BestCenters />
      <ServicesBanner />
      <SuggestedCenters />
      <Testimonials />
      <BlogSection />
      <Footer />
    </div>
  )
}
