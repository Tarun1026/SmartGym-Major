import React from 'react'
import "../css/Card.css"
import { useNavigate } from 'react-router-dom'


export default function Card({ title, exerciseCount, time, image}) {
  const navigate=useNavigate();
  const onClick = ()=>{
    console.log("clicked card");
    navigate("/exercise")
  }
  console.log(image)
  return (

    <div className="card" onClick={onClick} style={{ border: '1px solid #ddd',padding:"10px", margin: '10px', cursor: 'pointer', backgroundImage: `url(${image})`,backgroundSize: 'cover',
    backgroundPosition: 'center'
}}>
     <div className='subTitle'>
        <h3 style={{margin:"10px",fontSize:"30px"}}>{title}</h3>
        <p style={{margin:"10px"}}>{exerciseCount} Exercises</p>
        <p style={{margin:"10px"}}>{time} Minutes</p>
     </div>
  </div>
  )
}