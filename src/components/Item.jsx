import React, { useEffect, useState } from 'react'

export default function Item({ cardType, data }) {
  const [type, setType] = useState('exp')

  useEffect(() => {
    if (cardType === 'exp') setType('exp')
    if (cardType === 'proj') setType('proj')
  }, [cardType])

  const handleItemClick = () => {
    window.open(data.link, '_blank')
  }

  return (
    <div className='item__card' onClick={handleItemClick}>
      <div className='item__card__left'>
        {type === 'exp' && <p>{data.date}</p>}
        {type === 'proj' && data.image && (
          <div className='imgContainer'>
            <img
              src={data.image}
              alt={`Image of Featured Project ${data.title}`}
            />
          </div>
        )}
      </div>
      <div className='item__card__right'>
        <div className='item__card__rightJob'>
          <a href={data.link}>
            {type === 'exp'
              ? `${data.position} - ${data.company}`
              : `${data.title}`}
          </a>
          <p>{data.description}</p>
        </div>
        <div className='item__card__toolsContainer'>
          {data.tools.map((item, index) => {
            return (
              <span className='item__card__tools' key={index}>
                {item}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
