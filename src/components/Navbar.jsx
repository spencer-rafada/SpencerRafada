import React, { useState } from 'react'
import { GoPersonFill } from 'react-icons/go'
import { MdWork } from 'react-icons/md'
import { AiFillCode } from 'react-icons/ai'

export default function Navbar({ aboutRef, expRef, projRef }) {
  const [active, setActive] = useState('about')

  const handleNavClick = (item) => {
    if (item === 'about') {
      setActive('about')
      console.log(aboutRef)
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    if (item === 'work') {
      setActive('work')
      expRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    if (item === 'proj') {
      setActive('proj')
      projRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className='infoSection__navBar'>
      <div
        className={active === 'about' ? `active` : `inactive`}
        onClick={() => handleNavClick('about')}
      >
        <GoPersonFill />
        <p>About</p>
      </div>
      <span className='line'>x</span>
      <div
        className={active === 'work' ? `active` : `inactive`}
        onClick={() => handleNavClick('work')}
      >
        <MdWork />
        <p>Experience</p>
      </div>
      <span className='line'>x</span>
      <div
        className={active === 'proj' ? `active` : `inactive`}
        onClick={() => handleNavClick('proj')}
      >
        <AiFillCode />
        <p>Projects</p>
      </div>
    </div>
  )
}
