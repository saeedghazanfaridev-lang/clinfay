import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import FilterBox from '../components/FilterBox'
import BestCenters from '../components/BestCenters'
import ServicesBanner from '../components/ServicesBanner'
import SuggestedCenters from '../components/SuggestedCenters'
import Testimonials from '../components/Testimonials'
import BlogSection from '../components/BlogSection'
import Faq from '../components/Faq'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function HomePage() {
  const navigate = useNavigate()
  useDocumentTitle()

  // Home search sends the visitor to the results page with the filters in the URL.
  const handleSearch = (values) => {
    const qs = new URLSearchParams()
    Object.entries(values).forEach(([k, v]) => v && qs.set(k, v))
    navigate(`/clinics${qs.toString() ? `?${qs}` : ''}`)
  }

  return (
    <>
      <Hero />
      <FilterBox onSubmit={handleSearch} />
      <BestCenters />
      <ServicesBanner />
      <SuggestedCenters />
      <Testimonials />
      <BlogSection />
      <Faq />
    </>
  )
}
