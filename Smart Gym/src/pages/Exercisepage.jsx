import React, { useState } from 'react';

const ExercisePage = () => {
  const [isExercising, setIsExercising] = useState(false);
  const [status, setStatus] = useState('');

  // Function to start the exercise
  const startExercise = () => {
    fetch('http://localhost:5000/start-exercise', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exercise: 'pushup', count: 10 }) // Exercise is 'pushup', count is 10
    })
      .then((response) => response.json())
      .then((data) => {
        setIsExercising(true);  // Set state to indicate that exercise has started
        setStatus('Pushup exercise started!');
      })
      .catch((error) => {
        console.error('Error starting exercise:', error);
        setStatus('Error starting exercise');
      });
  };

  // Function to skip the exercise
  const skipExercise = () => {
    fetch('/skip-exercise', { method: 'POST' })
      .then((response) => response.json())
      .then((data) => {
        setIsExercising(false); // Set state to indicate that exercise has stopped
        setStatus('Exercise skipped!');
      })
      .catch((error) => {
        console.error('Error skipping exercise:', error);
        setStatus('Error skipping exercise');
      });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Smart Gym Exercise</h1>

      {/* Start Exercise Button */}
      {!isExercising && (
        <button onClick={startExercise} style={buttonStyle}>
          Start Pushup Exercise (10 Reps)
        </button>
      )}

      {/* Skip Exercise Button */}
      {isExercising && (
        <button onClick={skipExercise} style={buttonStyle}>
          Skip Exercise
        </button>
      )}

      {/* Display Status */}
      <div style={{ marginTop: '20px', fontSize: '18px', color: 'green' }}>
        {status}
      </div>
    </div>
  );
};

// Styling for buttons
const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  margin: '10px',
  backgroundColor: '#007BFF',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
};

export default ExercisePage;
