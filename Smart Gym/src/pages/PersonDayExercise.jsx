import React from "react";
import '../css/PersonDayExercise.css';

function PersonDayExercise() {
  return (
    <div className="exercise-wrapper">
      <h2 className="exercise-title">Today's Exercise</h2>

      <div className="exercise-card">
        <img
          className="exercise-image"
          src="https://th.bing.com/th/id/OIP.eX5LpIG3sF5EuLdJ8NHDJwHaE9?w=274&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="Pushup"
        />
        <div className="info">
          <div className="name">Pushup</div>
          <div className="reps">Reps: 20</div>
        </div>
        <button>Click to Start</button>
      </div>

      <div className="exercise-card">
        <img
          className="exercise-image"
          src="https://th.bing.com/th/id/OIP.eX5LpIG3sF5EuLdJ8NHDJwHaE9?w=274&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="Squats"
        />
        <div className="info">
          <div className="name">Squats</div>
          <div className="reps">Reps: 15</div>
        </div>
        <button>Click to Start</button>
      </div>

      <div className="exercise-card">
        <img
          className="exercise-image"
          src="https://th.bing.com/th/id/OIP.eX5LpIG3sF5EuLdJ8NHDJwHaE9?w=274&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="Jumping Jacks"
        />
        <div className="info">
          <div className="name">Jumping Jacks</div>
          <div className="reps">Reps: 30</div>
        </div>
        <button>Click to Start</button>
      </div>
    </div>
  );
}

export default PersonDayExercise;
