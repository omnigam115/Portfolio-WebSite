// App.jsx — Main application assembly
import { useState, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'

// Components
import LoadingScreen       from './components/LoadingScreen'
import CustomCursor        from './components/CustomCursor'
import ParticleBackground  from './components/ParticleBackground'
import Navbar              from './components/Navbar'
import HeroSection         from './components/HeroSection'
import AboutSection        from './components/AboutSection'
import ProjectsSection     from './components/ProjectsSection'
import SkillsSection       from './components/SkillsSection'
import CertificationsSection from './components/CertificationsSection'
import AchievementsSection from './components/AchievementsSection'
import ContactSection      from './components/ContactSection'
import Footer              from './components/Footer'
import VoiceAssistant      from './components/VoiceAssistant'
import SectionDivider      from './components/SectionDivider'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Animated particle galaxy background */}
      <ParticleBackground />

      {/* Main layout */}
      <div className="relative min-h-screen">
        {/* Background radial glow */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 80% 50%, rgba(123,47,247,0.05) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 20% 80%, rgba(255,0,110,0.03) 0%, transparent 60%)
            `,
          }}
        />

        {/* Navigation */}
        <Navbar />

        {/* Page sections */}
        <main className="relative z-10">
          <HeroSection />

          <SectionDivider />
          <AboutSection />

          <SectionDivider flip />
          <ProjectsSection />

          <SectionDivider />
          <SkillsSection />

          <SectionDivider flip />
          <CertificationsSection />

          <SectionDivider />
          <AchievementsSection />

          <SectionDivider flip />
          <ContactSection />
        </main>

        <Footer />

        {/* Floating AI Voice Assistant */}
        <VoiceAssistant />
      </div>
    </>
  )
}
