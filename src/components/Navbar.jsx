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
      <GoPersonFill
        className={active === 'about' ? `active` : null}
        onClick={() => handleNavClick('about')}
      />
      <span className='line'>x</span>
      <MdWork
        className={active === 'work' ? `active` : null}
        onClick={() => handleNavClick('work')}
      />
      <span className='line'>x</span>
      <AiFillCode
        className={active === 'proj' ? `active` : null}
        onClick={() => handleNavClick('proj')}
      />
    </div>
  )
}
