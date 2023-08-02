import React from 'react'
import projectsData from '../data/PROJECTS'
import Item from './Item'

export default function FeaturedProjects() {
  console.log(projectsData)
  return (
    <div className='displaySection__projects'>
      <h2>Featured Projects</h2>
      {projectsData.map((item) => {
        return <Item cardType={'proj'} data={item} />
      })}
    </div>
  )
}
