import { useEffect,useState } from 'react';
import axios from 'axios';
import "../css/Recommended.css";

const RecommendedPage = () => {
    const [recommendations, setRecommendations] = useState({});
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

  const splitExercise = (exercise) => {
    const [exerciseName, exerciseCount] = exercise.split('(');
    return { name: exerciseName.trim(), count: exerciseCount.replace(')', '').trim() };
  };

  return (
    <div>
      <h1>Exercises To Do</h1>
      {Object.keys(recommendations).map((week, weekIndex) => (
        <div key={weekIndex} className="week-container">
          <h2>{week}</h2>
          {recommendations[week].map((dayExercises, dayIndex) => (
            <div key={dayIndex} className="day-container">
              <h3>Day {dayIndex + 1}</h3>
              {dayExercises.split(',').map((exercise, exerciseIndex) => {
                const { name, count } = splitExercise(exercise);
                return (
                  <div key={exerciseIndex} className="exercise-container">
                    <span className="exercise-name">{name}</span>
                    <span className="exercise-count">{count}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RecommendedPage;
