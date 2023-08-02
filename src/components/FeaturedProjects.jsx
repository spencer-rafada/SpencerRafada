import React from 'react'
import projectsData from '../data/PROJECTS'
import Item from './Item'

export default function FeaturedProjects({ aRef }) {
  return (
    <div ref={aRef} className='displaySection__projects'>
      <h2>Featured Projects</h2>
      {projectsData.map((item, index) => {
        return <Item key={index} cardType={'proj'} data={item} />
      })}
    </div>
  )
}
