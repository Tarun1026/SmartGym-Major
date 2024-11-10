import React, { useState } from 'react';
import "../css/ExerciseScreen.css"
import { useLocation } from 'react-router-dom';

export default function ExerciseScreen() {
  const location = useLocation();
  const workouts = location.state?.workouts || [];
  // State to keep track of the current workout index
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);

  // Current workout based on the current index
  const currentWorkout = workouts[currentWorkoutIndex];
  const handleNext = () => {
    if (currentWorkoutIndex < workouts.length - 1) {
      setCurrentWorkoutIndex(currentWorkoutIndex + 1);
    } else {
      alert("Workout completed!"); // Optional completion message
    }
  };

  return (
    <div className='workScreen' >
        <div className='container1' >
            <h1> Smart Gym </h1>
            <img className='video' src="" alt="no video"/>
        </div>
        <div className='container2' >
            {currentWorkout ? (
              <>
                <img className='gif' src={currentWorkout.gif} alt="Workout gif" />
                <div className='content'>
                  <h1>{currentWorkout.title}</h1>
                  <h2>{currentWorkout.exerciseCount}</h2>
                  <button className='button' onClick={handleNext}>Next</button>
                </div>
              </>
            ) : (
              <p>No workout data available</p>
            )}
        </div>
    </div>
  )
}
