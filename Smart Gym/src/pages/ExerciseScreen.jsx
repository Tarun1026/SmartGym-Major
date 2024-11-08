import React from 'react'
import "../css/ExerciseScreen.css"

export default function ExerciseScreen() {
  return (
    <div className='workScreen' >
        <div className='container1' >
            <h1> Smart Gym </h1>
            <img className='video' src="" alt="no video"/>
        </div>
        <div className='container2' >
            <img className='gif' src="" alt="no gif"/>
            <div className='content'>
                <h1>Pushups</h1>
                <h2>x12</h2>
                <button className='button' > Skip </button>
            </div>

        </div>
    </div>
  )
}
