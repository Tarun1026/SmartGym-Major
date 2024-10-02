import { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/ExercisePage.css";

const Exercise = () => {
  const [exerciseStarted, setExerciseStarted] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  useEffect(() => {
    const storedExercises = JSON.parse(localStorage.getItem('exerciseStarted'));
    if (storedExercises) {
      setExerciseStarted(storedExercises);
    }
  }, []);

  const handleStartExercise = async (exercise) => {
    try {
      // Disable the button right after the click
      setExerciseStarted((prevStarted) => {
        const updatedState = {
          ...prevStarted,
          [exercise]: true,
        };
        localStorage.setItem('exerciseStarted', JSON.stringify(updatedState));
        return updatedState;
      });

      // Send the selected exercise to the Flask server
      await axios.post('http://127.0.0.1:8000/', { choice: exercise, count: 10 });

      // Redirect to the Flask server page
      window.location.href = 'http://127.0.0.1:8000';
    } catch (error) {
      console.error('Error starting exercise:', error);
    }
  };

  const handleResetExercise = (exercise) => {
    setExerciseStarted((prevStarted) => {
      const updatedState = {
        ...prevStarted,
        [exercise]: false,
      };
      localStorage.setItem('exerciseStarted', JSON.stringify(updatedState));
      return updatedState;
    });
  };

  return (
    <div className="exercise-container">
      <div className="exercise">
        <label>Pushup</label>
        {exerciseStarted[1] ? (
          <div className="button-group">
            <div className="done">Done</div>
            <button 
              type="button" 
              className="reset-button" 
              onClick={() => handleResetExercise(1)}
            >
              Reset
            </button>
          </div>
        ) : (
          <button 
            type="button" 
            className="start-button" 
            onClick={() => handleStartExercise('1')}
          >
            Start
          </button>
        )}
      </div>
      <div className="exercise">
        <label>Bicep Curl</label>
        {exerciseStarted[2] ? (
          <div className="button-group">
            <div className="done">Done</div>
            <button 
              type="button" 
              className="reset-button" 
              onClick={() => handleResetExercise(2)}
            >
              Reset
            </button>
          </div>
        ) : (
          <button 
            type="button" 
            className="start-button" 
            onClick={() => handleStartExercise('2')}
          >
            Start
          </button>
        )}
      </div>
      <div className="exercise">
        <label>Plank</label>
        {exerciseStarted[3] ? (
          <div className="button-group">
            <div className="done">Done</div>
            <button 
              type="button" 
              className="reset-button" 
              onClick={() => handleResetExercise(3)}
            >
              Reset
            </button>
          </div>
        ) : (
          <button 
            type="button" 
            className="start-button" 
            onClick={() => handleStartExercise('3')}
          >
            Start
          </button>
        )}
      </div>
      <div className="exercise">
        <label>Tree Pose</label>
        {exerciseStarted[4] ? (
          <div className="button-group">
            <div className="done">Done</div>
            <button 
              type="button" 
              className="reset-button" 
              onClick={() => handleResetExercise(4)}
            >
              Reset
            </button>
          </div>
        ) : (
          <button 
            type="button" 
            className="start-button" 
            onClick={() => handleStartExercise('4')}
          >
            Start
          </button>
        )}
      </div>
      <div className="exercise">
        <label>T Pose</label>
        {exerciseStarted[5] ? (
          <div className="button-group">
            <div className="done">Done</div>
            <button 
              type="button" 
              className="reset-button" 
              onClick={() => handleResetExercise(5)}
            >
              Reset
            </button>
          </div>
        ) : (
          <button 
            type="button" 
            className="start-button" 
            onClick={() => handleStartExercise('5')}
          >
            Start
          </button>
        )}
      </div>
      <div className="exercise">
        <label>Warrior Pose</label>
        {exerciseStarted[6] ? (
          <div className="button-group">
            <div className="done">Done</div>
            <button 
              type="button" 
              className="reset-button" 
              onClick={() => handleResetExercise(6)}
            >
              Reset
            </button>
          </div>
        ) : (
          <button 
            type="button" 
            className="start-button" 
            onClick={() => handleStartExercise('6')}
          >
            Start
          </button>
        )}
      </div>
    </div>
  );
};

export default Exercise;
