import { useState, useEffect } from 'react';
import axios from 'axios';
import {  useLocation } from 'react-router-dom';
import "../css/ExercisePage.css";
import List from '../components/List';
import absIntermediate from '../assets/intermediate/abs.jpg';

const Exercise = () => {
  
  const location = useLocation();
  const image = location.state?.image;
  console.log(image)
  const handleStartExercise = async (exercise) => {
    
  };

  
  return (
    <div className="exercise-container">
      <div className='exercise-list'>
        <div className='imageCont'>
          {image ? <img className='img' src={image} alt="Exercise" /> : <p>No image provided</p>}
        </div>
        <div className='list' >
           <List image={absIntermediate} name="Abdominal Crunches" count="x10" />
           <List image={absIntermediate} name="Abdominal Crunches" count="x10" />
           <List image={absIntermediate} name="Abdominal Crunches" count="x10" />
           <List image={absIntermediate} name="Abdominal Crunches" count="x10" />
           <List image={absIntermediate} name="Abdominal Crunches" count="x10" />
           <List image={absIntermediate} name="Abdominal Crunches" count="x10" />
           <List image={absIntermediate} name="Abdominal Crunches" count="x10" />
        </div>
        <button className='button' > Start</button>
      </div>
    </div>
  );

};

export default Exercise;
