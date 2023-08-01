import React from 'react'
import InfoSection from './components/InfoSection'
import About from './components/About'
import Experience from './components/Experience'
import FeaturedProjects from './components/FeaturedProjects'

export default function App() {
  return (
    <div className='mainSection'>
      <div className='mainSection__grid'>
        <InfoSection />
        <div className='displaySection'>
          <About />
          <Experience />
          <FeaturedProjects />
        </div>
      </div>
    </div>
  )
}
