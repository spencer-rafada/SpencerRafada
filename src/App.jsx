import React, { useRef } from 'react'
import InfoSection from './components/InfoSection'
import About from './components/About'
import Experience from './components/Experience'
import FeaturedProjects from './components/FeaturedProjects'
import Footer from './components/Footer'
import StarfieldAnimation from 'react-starfield-animation'

export default function App() {
  const aboutRef = useRef(null)
  const expRef = useRef(null)
  const projRef = useRef(null)

  return (
    <>
      <StarfieldAnimation
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          'z-index': '-5',
          'background-color': '#070a13',
        }}
        numParticles={400}
        particleSpeed={0}
        dx={0.000000001} // x speed of stars in px/frame, default 0.05
        dy={0.000000001}
      />
      <main>
        <div className='mainSection'>
          <div className='mainSection__grid'>
            <InfoSection
              aboutRef={aboutRef}
              expRef={expRef}
              projRef={projRef}
            />
            <div className='displaySection'>
              <About aRef={aboutRef} />
              <Experience aRef={expRef} />
              <FeaturedProjects aRef={projRef} />
              <Footer />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
