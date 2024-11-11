import React, { useEffect, useState } from 'react';
import "../css/WorkoutSummary.css";
import SummaryList from './SummaryList';
import axios from "axios";

export default function WorkoutSummary() {
    const [work, setWork] = useState([]);

    const fetchWorkOutSummary = async () => {
        try {
            const response = await axios.get('/api/v1/users/user-workout-summary');
            const workoutData = response.data.data.workoutSummary || [];
            // Sort data by the latest date if date property exists
            workoutData.sort((a, b) => new Date(b.date) - new Date(a.date)).reverse();
            setWork(workoutData);
        } catch (error) {
            console.log("Error fetching workout:", error);
        }
    };

    useEffect(() => {
        fetchWorkOutSummary();
    }, []);

    return (
        <div className='workoutContainer'>
            <div className="workout-summary-container">
                {work.map((summary, index) => (
                    <SummaryList 
                        key={summary._id || index}
                        image={summary.image || "./src/assets/recom.webp"} // Fallback image if none provided
                        title={summary.title || "Recommended Workout"}
                        workoutTime={Math.floor(summary.timeTaken/60)+1 || 0} // Use actual time taken
                        kcal={summary.caloriesBurned || 0} // Use actual calories burned
                        time={new Date(summary.createdAt ).toLocaleTimeString()} // Adjust based on actual time format
                        date={new Date(summary.createdAt).toLocaleDateString() || new Date().toLocaleDateString()} // Fallback to current date if not provided
                    />
                ))}
            </div>
        </div>
    );
}
