import React, { useEffect, useState } from 'react'
import "../css/Progress.css"
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from 'axios';
export default function Progress({ workouts, kcal, time }) {


  const[progress,setProgress]=useState([])
  const fetchWorkOutSummary=async()=>{
    try {
        const response=await axios.get('/api/v1/users/user-workout-summary')
        console.log("Progress",response.data.data)
        setProgress(response.data.data)
    } catch (error) {
        console.log("error fetching progress",error)
    }
}
useEffect(()=>{
    fetchWorkOutSummary()
},[])
  return (
    <div className="progress-container">
      <div className="progress-details">
        <WorkspacePremiumOutlinedIcon backgroundColor='#fff'  sx={{ fontSize: 40, color:'#F8D210' }} />
        <p className="progress-desc">
          {progress.totalWorkouts? progress.totalWorkouts : "--"}
 </p>
        <p className="progress-desc">Workouts</p>
      </div>

      <div className="progress-details">
        <WhatshotIcon  backgroundColor='#fff'  sx={{ fontSize: 40,color:'#FFA500'}} />
        <p className="progress-desc">
          {progress.totalCaloriesBurned
 ? progress.totalCaloriesBurned
 : "--"}</p>
        <p className="progress-desc">Kcal</p>
      </div>

      <div className="progress-details">
        <AccessTimeIcon backgroundColor='#fff'  sx={{ fontSize: 40,color:'#000' }} />
        <p className="progress-desc">{progress.totalTimeTaken
 ? Math.floor(progress.totalTimeTaken/60)
 : "--"}</p>
        <p className="progress-desc">Minutes</p>
      </div>
    </div>
  )
}