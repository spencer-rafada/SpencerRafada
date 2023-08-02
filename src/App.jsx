import React, { useRef } from 'react'
import InfoSection from './components/InfoSection'
import About from './components/About'
import Experience from './components/Experience'
import FeaturedProjects from './components/FeaturedProjects'
import Footer from './components/Footer'

export default function App() {
  const aboutRef = useRef(null)
  const expRef = useRef(null)
  const projRef = useRef(null)

  return (
    <div className='mainSection'>
      <div className='mainSection__grid'>
        <InfoSection aboutRef={aboutRef} expRef={expRef} projRef={projRef} />
        <div className='displaySection'>
          <About aRef={aboutRef} />
          <Experience aRef={expRef} />
          <FeaturedProjects aRef={projRef} />
          <Footer />
        </div>
      </div>
    </div>
  )
}
