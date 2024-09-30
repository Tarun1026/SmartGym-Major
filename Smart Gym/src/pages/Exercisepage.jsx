
import { useState } from 'react';
import axios from 'axios';

const Exercise = () => {
  const [selectedExercise, setSelectedExercise] = useState('');

  const handleExerciseChange = (event) => {
    setSelectedExercise(event.target.value);
  };

  const handleStartExercise = async () => {
    if (selectedExercise) {
      try {
        // Send a POST request to the Flask server with the selected exercise
        await axios.post('http://127.0.0.1:5000/', { choice: selectedExercise, count:10});
        // Redirect to the Flask server page (or handle this on the frontend if needed)
        window.location.href = 'http://127.0.0.1:5000';
      } catch (error) {
        console.error('Error starting exercise:', error);
      }
    }
  };

  return (
    <div>
      <h1>Select an Exercise</h1>
      <form>
        <div>
          <input
            type="radio"
            id="pushup"
            name="exercise"
            value="1"
            onChange={handleExerciseChange}
          />
          <label htmlFor="pushup">Pushup</label>
        </div>
        <div>
          <input
            type="radio"
            id="bicep"
            name="exercise"
            value="2"
            onChange={handleExerciseChange}
          />
          <label htmlFor="bicep">Bicep Curl</label>
        </div>
        <div>
          <input
            type="radio"
            id="plank"
            name="exercise"
            value="3"
            onChange={handleExerciseChange}
          />
          <label htmlFor="plank">Plank</label>
        </div>
        <div>
          <input
            type="radio"
            id="tree"
            name="exercise"
            value="4"
            onChange={handleExerciseChange}
          />
          <label htmlFor="tree">Tree Pose</label>
        </div>
        <div>
          <input
            type="radio"
            id="tpose"
            name="exercise"
            value="5"
            onChange={handleExerciseChange}
          />
          <label htmlFor="tpose">T Pose</label>
        </div>
        <div>
          <input
            type="radio"
            id="warrior"
            name="exercise"
            value="6"
            onChange={handleExerciseChange}
          />
          <label htmlFor="warrior">Warrior Pose</label>
        </div>
        <button type="button" onClick={handleStartExercise}>
          Start Exercise
        </button>
      </form>
    </div>
  )}  

export default Exercise;
