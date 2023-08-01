import React from 'react'
import InfoSection from './components/InfoSection'

export default function App() {
  return (
    <div className='mainSection'>
      <div className='mainSection__grid'>
        <InfoSection />
        <div className='displaySection'>X</div>
      </div>
    </div>
  )
}
