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

  const [exerciseCount, setExerciseCount] = useState({
    pushup: 0,
    bicep: 0,
    plank: 0,
    Tpose: 0,
    Treepose: 0,
    Warriorpose: 0,
  });

  const exerciseMap = {
    1: 'pushup',
    2: 'bicep',
    3: 'plank',
    4: 'Treepose',
    5: 'Tpose',
    6: 'Warriorpose',
  };

  useEffect(() => {
    const storedExercises = JSON.parse(localStorage.getItem('exerciseStarted'));
    if (storedExercises) {
      setExerciseStarted(storedExercises);
    }

    const storedCounts = JSON.parse(localStorage.getItem('exerciseCount'));
    if (storedCounts) {
      setExerciseCount(storedCounts);
    }

    // Check if a day has passed and reset counts if needed
    const lastResetDate = localStorage.getItem('lastResetDate');
    if (lastResetDate) {
      const lastDate = new Date(lastResetDate);
      const now = new Date();
      const oneDay = 24 * 60 * 60 * 1000;

      if (now - lastDate > oneDay) {
        setExerciseCount({
          pushup: 0,
          bicep: 0,
          plank: 0,
          Tpose: 0,
          Treepose: 0,
          Warriorpose: 0,
        });
        localStorage.setItem('exerciseCount', JSON.stringify({
          pushup: 0,
          bicep: 0,
          plank: 0,
          Tpose: 0,
          Treepose: 0,
          Warriorpose: 0,
        }));
        localStorage.setItem('lastResetDate', now.toISOString());
      }
    } else {
      localStorage.setItem('lastResetDate', new Date().toISOString());
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Find the currently started exercise
      const currentExercise = Object.keys(exerciseStarted).find(key => exerciseStarted[key]);
      if (currentExercise) {
        const exerciseName = exerciseMap[currentExercise];
        axios.get(`http://127.0.0.1:8000/get_${exerciseName}_count`)
          .then((response) => {
            setExerciseCount(prevCount => ({
              ...prevCount,
              [exerciseName]: response.data.count,
            }));
            localStorage.setItem('exerciseCount', JSON.stringify({
              ...exerciseCount,
              [exerciseName]: response.data.count,
            }));
          })
          .catch((error) => {
            console.error(`Error fetching ${exerciseName} count:`, error);
          });
      }
    }, 1000); // Poll every 1 second
  
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [exerciseMap, exerciseStarted]); // Remove exerciseCount dependency
  
  const handleStartExercise = async (exercise) => {
    try {
      // Reset all exercises to not started and set the selected one to started
      setExerciseStarted((prevStarted) => {
        const updatedState = Object.keys(prevStarted).reduce((acc, key) => ({
          ...acc,
          [key]: key === exercise,
        }), {});
        localStorage.setItem('exerciseStarted', JSON.stringify(updatedState));
        return updatedState;
      });
  
      await axios.post('http://127.0.0.1:8000/', { choice: exercise, count: 2 });
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