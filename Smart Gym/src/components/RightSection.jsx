import React from 'react'
import "../css/RightSection.css"
import Progress from './Progress'
import Bmi from './Bmi'
import WorkoutSummary from './WorkoutSummary'
export default function RightSection() {
  return (
    <div className='RightContainer'>
      <div className='progress' >
          <h1>Progress</h1>
            <Progress workouts={10} kcal={2000} time={150}/>
      </div>
      <div>
        <h1>BMI</h1>
        <Bmi/>
      </div>
      <div>
        <h2 style={{ marginTop: 0 , fontSize:"30px"}}>Workout Summary</h2>
        <WorkoutSummary />
      </div>
    </div>
  )
}