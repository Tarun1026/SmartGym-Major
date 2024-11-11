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
    5: 'Tpose',
    4: 'Treepose',
    6: 'Warriorpose',
  };

  useEffect(() => {
    // Check if start time exists; if not, set it
    if (!localStorage.getItem('exerciseStartTime')) {
      const startTime = new Date().toISOString();
      localStorage.setItem('exerciseStartTime', startTime);
      localStorage.setItem('exerciseInProgress', JSON.stringify(true));
    }
    
    const storedExercises = JSON.parse(localStorage.getItem('exerciseStarted'));
    if (storedExercises) setExerciseStarted(storedExercises);

    const storedCounts = JSON.parse(localStorage.getItem('exerciseCount'));
    console.log("stored",storedCounts)
    if (storedCounts) setExerciseCount(storedCounts);

    const lastResetDate = localStorage.getItem('lastResetDate');
    if (lastResetDate) {
      const lastDate = new Date(lastResetDate);
      const now = new Date();
      const oneDay = 24 * 60 * 60 * 1000;

      if (now - lastDate > oneDay) {
        const resetCounts = {
          pushup: 0,
          bicep: 0,
          plank: 0,
          Tpose: 0,
          Treepose: 0,
          Warriorpose: 0,
        };
        setExerciseCount(resetCounts);
        localStorage.setItem('exerciseCount', JSON.stringify(resetCounts));
        localStorage.setItem('lastResetDate', now.toISOString());
      }
    } else {
      localStorage.setItem('lastResetDate', new Date().toISOString());
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
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
    }, 1000);
  
    return () => clearInterval(interval);
  }, [exerciseMap, exerciseStarted]);

  const handleStartExercise = async (exercise) => {
    try {
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

  const finishClick = async () => {
    // Get start time from local storage and calculate the duration
    const startTime = new Date(localStorage.getItem('exerciseStartTime'));
    const endTime = new Date();
    const duration = Math.floor((endTime - startTime) / 1000); // Duration in seconds
    console.log("dura",duration)
    // Clear exercise progress in local storage
    localStorage.setItem('exerciseInProgress', JSON.stringify(false));
    localStorage.removeItem('exerciseStartTime');

    try {
      const storedCounts = JSON.parse(localStorage.getItem('exerciseCount'));
      await axios.post("/api/v1/users/calorie", { storedCounts, duration });
      console.log("Finished exercise with duration:", duration, "seconds");
    } catch (error) {
      console.error("Error finishing exercise:", error);
    }
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
      <div>
      <button className="finish-button" onClick={finishClick} >
      Finish
    </button>
      </div>
    </div>
  );
};

export default Exercise;