// ─── src/pages/LandingPage.jsx ────────────────────────────────────────────────
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import AboutSection from './landing/AboutSection'
import ContactSection from './landing/ContactSection'
import HeroSection from './landing/HeroSection'
import ServicesSection from './landing/ServiceSection'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}