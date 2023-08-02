import React from 'react'
import experienceData from '../data/EXPERIENCE'
import Item from './Item'

export default function Experience({ aRef }) {
  const handleViewResume = () => {
    window.open('/SpencerRafada.pdf', '_blank')
  }
  return (
    <div ref={aRef} className='displaySection__experience'>
      {experienceData.map((exp, index) => {
        return <Item key={index} data={exp} cardType={'exp'} />
      })}
      <a onClick={handleViewResume} className='view__resume'>
        View Full Resume!
      </a>
    </div>
  )
}
