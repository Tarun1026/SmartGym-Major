import React from 'react'
import "../css/WorkoutSummary.css"
import SummaryList from './SummaryList';
export default function WorkoutSummary() {

     const summaries = [
        {
            title: "Recommended Workout",
            workoutTime: 15,
            Kcal: 200,
            // Note: You need to define a time value, for example, in seconds. 
            // Replace `summary.time.seconds` with an actual time value for demonstration.
            time: { seconds: Date.now() / 1000 }, // Example placeholder
            date: new Date(Date.now()).toLocaleDateString(), // Use current date for example
            image: "./src/assets/recom.webp"
        },
        {
            title: "Recommended Workout",
            workoutTime: 15,
            Kcal: 200,
            // Note: You need to define a time value, for example, in seconds. 
            // Replace `summary.time.seconds` with an actual time value for demonstration.
            time: { seconds: Date.now() / 1000 }, // Example placeholder
            date: new Date(Date.now()).toLocaleDateString(), // Use current date for example
            image: "./src/assets/recom.webp"
        },
        {
            title: "Recommended Workout",
            workoutTime: 15,
            Kcal: 200,
            // Note: You need to define a time value, for example, in seconds. 
            // Replace `summary.time.seconds` with an actual time value for demonstration.
            time: { seconds: Date.now() / 1000 }, // Example placeholder
            date: new Date(Date.now()).toLocaleDateString(), // Use current date for example
            image: "./src/assets/recom.webp"
        },
        {
            title: "Recommended Workout",
            workoutTime: 15,
            Kcal: 200,
            // Note: You need to define a time value, for example, in seconds. 
            // Replace `summary.time.seconds` with an actual time value for demonstration.
            time: { seconds: Date.now() / 1000 }, // Example placeholder
            date: new Date(Date.now()).toLocaleDateString(), // Use current date for example
            image: "./src/assets/recom.webp"
        },
    ];


  return (
    <div className='workoutContainer' >
        <div className="workout-summary-container">
                {summaries.map((summary, index) => (
                    <SummaryList 
                        key={index}
                        image={summary.image}
                        title={summary.title}
                        workoutTime={summary.workoutTime}
                        kcal={summary.Kcal}
                        time={new Date(summary.time.seconds * 1000).toLocaleTimeString()} // Use proper time format
                        date={new Date(summary.time.seconds * 1000).toLocaleDateString()} // Use proper date format
                    />
                ))}
        </div>
    </div>
    
  )
}