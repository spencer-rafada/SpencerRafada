/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import {
  BiLogoGithub,
  BiLogoLinkedin,
  BiLogoGmail,
  BiLogoInstagramAlt,
} from 'react-icons/bi'

export default function InfoSection() {
  const handleNavBarClick = (icon) => {
    let link = ''
    if (icon === 'github') link = 'https://github.com/spencer-rafada'
    if (icon === 'linkedin')
      link = 'https://www.linkedin.com/in/spencer-rafada/'
    if (icon === 'gmail') link = 'mailto:neilspencerrafada@gmail.com'
    if (icon === 'instagram') link = 'https://www.instagram.com/spencerrafada/'
    window.open(link, '_blank')
  }
  return (
    <div className='infoSection'>
      <div className='infoSection__header'>
        <div className='infoSection__headerInfo'>
          <h1>Spencer Rafada</h1>
          <h3>Currently looking for full time job opportunities</h3>
          <p>
            It motivates me to create applications that will solve problems and
            be impactful in other's lives.
          </p>
        </div>
        <div className='infoSection__navBar'>NAV</div>
      </div>
      <div className='infoSection__contactSection'>
        <BiLogoGithub onClick={() => handleNavBarClick('github')} />
        <BiLogoLinkedin onClick={() => handleNavBarClick('linkedin')} />
        <BiLogoGmail onClick={() => handleNavBarClick('gmail')} />
        <BiLogoInstagramAlt onClick={() => handleNavBarClick('instagram')} />
      </div>
    </div>
  )
}
