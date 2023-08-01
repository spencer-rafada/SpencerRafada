import React from 'react'
import experienceData from '../data/EXPERIENCE'
import Item from './Item'

export default function Experience() {
  const handleViewResume = () => {
    window.open('/SpencerRafada.pdf', '_blank')
  }
  return (
    <div className='displaySection__experience'>
      {experienceData.map((exp, index) => {
        return <Item key={index} data={exp} cardType={'exp'} />
      })}
      <a onClick={handleViewResume} className='view__resume'>
        View Full Resume!
      </a>
    </div>
  )
}
