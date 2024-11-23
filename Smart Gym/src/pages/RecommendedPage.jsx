import { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/Recommended.css";

const RecommendedPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [uniqueExercises, setUniqueExercises] = useState([]);
  const fetchRecommendation = async () => {
    try {
      const response = await axios.get('/api/v1/users/get-recommendations');
      console.log('API Response:', response.data);
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    }
  };

  useEffect(() => {
    fetchRecommendation();
  }, []);

  useEffect(() => {
    const exerciseSet = new Set();
    const uniqueExerciseArray = [];
    Object.keys(recommendations).forEach(week => {
      recommendations[week].forEach(dayExercises => {
        dayExercises.split(',').forEach(exercise => {
          const { name, count } = splitExercise(exercise);

          if (!exerciseSet.has(name)) {
            exerciseSet.add(name);
            uniqueExerciseArray.push({ name, count });
          }
        });
      });
    });

    setUniqueExercises(uniqueExerciseArray);
  }, [recommendations]);
  console.log(JSON.stringify(uniqueExercises));
  const splitExercise = (exercise) => {
    const parts = exercise.split('(');
    const exerciseName = parts[0] ? parts[0].trim() : ''; // Extract the name
    const exerciseCount = parts[1] ? parts[1].replace(')', '').trim() : ''; // Safely extract and format count
    return { name: exerciseName, count: exerciseCount };
  };

  return (
    <div className='cont'>
      <h1>Recommended Exercise</h1>
      
      {uniqueExercises.map((exercise, index) => (
      <div key={index} className="exercise-container">
        <div className="exercise-details">
          <span className="exercise-name">{exercise.name}</span>
          <span className="exercise-count">({exercise.count})</span>
        </div>
        <button className="start-button">Start</button>
      </div>
))}
    </div>
  );
};

export default RecommendedPage;