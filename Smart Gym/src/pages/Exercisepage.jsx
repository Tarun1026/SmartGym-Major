import {  useLocation, useNavigate } from 'react-router-dom';
import "../css/ExercisePage.css";
import List from '../components/List';
import { workoutMapping } from '../assets/links';


const Exercise = () => {
  
  const location = useLocation();
  const navigate=useNavigate();
  const workoutDet = location.state?.title;
  const image= location.state?.image;
  const workouts = workoutMapping[workoutDet];
  const handleStartExercise = () => {
    navigate("/exerciseScreen", { state: { workouts } })
  };

  
  return (
    <div className="exercise-container">
      <div className='exercise-list'>
        <div className='imageCont'>
          {image ? <img className='img' src={image} alt="Exercise" /> : <p>No image provided</p>}
        </div>
        <div className='list' >
            {workouts.map((workout) =>(
                <List 
                key={workout.id}
                image={workout.gif} 
                name={workout.title} 
                count={workout.exerciseCount} />
            ))}

        </div>
        <div className='btn-align' >
          <button className='button' onClick={handleStartExercise} > Start</button>
        </div>
      </div>
    </div>
  );

};

export default Exercise;
