
import React from 'react'
import "../css/LeftSection.css"
import Card from './Card'
import CategoryExercises from './CategoryExercises'


export default function LeftSection() {
  return (
    <div className='LeftContainer'>
      <div className='recom'>
        <h1>Recommended Workouts</h1>
        <div style={{margin:"30px"}}>
          <Card title="Recommended Workouts" exerciseCount={12} time={20} image="./src/assets/recom.webp"/>
        </div>
      </div>
      <div className='workouts'>
        <h1>Workouts</h1>
        <div>
            <CategoryExercises heading="Beginner"  />
            <CategoryExercises heading="Intermediate"  />
            <CategoryExercises heading="Advanced"  />
        </div>
      </div>
    </div>
  )
}