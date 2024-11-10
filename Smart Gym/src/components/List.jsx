import React from 'react'
import "../css/List.css"
export default function List({image, name ,count}) {
  console.log(image)
  return (
    <div className='listItem' >
        <img className='listImg'  src={image} alt="no image"/>
        <div className='ListTitle' >
            {name}
        </div>
        <div className='listCount' >
            {count}
        </div>
    </div>
  )
}
