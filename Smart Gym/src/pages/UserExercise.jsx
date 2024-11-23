import { useState, useEffect } from 'react';
import axios from 'axios';

import {  useLocation, useNavigate } from 'react-router-dom';
import "../css/SamplePage.css";
import List from '../components/List';
import { workoutMapping } from '../assets/links';
import _default from '@mui/material/styles/identifier';

const Exercise2 = () => {

  const location = useLocation();
  const navigate=useNavigate();
  const workoutDet = location.state?.title;
  const image= location.state?.image;
  const workouts = workoutMapping[workoutDet];

    
  const handleStartExercise = () => {
    navigate("/exerciseScreen")
  };


  return (
    <div className="exercise-container">
      <div className='exercise-list'>
        <div className='imageCont2'>
          {image ? <img className='img' src={image} alt="Exercise" /> : <p>No image provided</p>}
        </div>
        <div className='list2' >
            {workouts.map((workout) =>(
                <List 
                key={workout.id}
                image={workout.gif} 
                name={workout.title} 
                count={workout.exerciseCount} />
            ))}

        </div>
        {/* <button className='button' > Start</button> */}
        <button className='button' onClick={handleStartExercise} > Start</button>
      </div>
    </div>
  );
}

export default Exercise2