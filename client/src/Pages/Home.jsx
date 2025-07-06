import HeroSection from '../Sections/HeroSection'
import Navbar from '../Sections/Navbar'
import ProductFeature from '../Sections/ProductFeature'
import Footer from '../Sections/Footer'
import FindHome from '../Sections/FindHome'
function Home() {
  return (
    <div className='flex items-center justify-center flex-col'>
      <Navbar />
      <HeroSection />
      <ProductFeature />
      <FindHome />
      <Footer />
    </div>
  )
}

export default Home