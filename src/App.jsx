import React from 'react'
import InfoSection from './components/InfoSection'
import About from './components/About'

export default function App() {
  return (
    <div className='mainSection'>
      <div className='mainSection__grid'>
        <InfoSection />
        <div className='displaySection'>
          <About />
        </div>
      </div>
    </div>
  )
}
