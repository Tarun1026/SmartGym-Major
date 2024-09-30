import React from 'react'
import "../css/Progress.css"
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Progress({ workouts, kcal, time }) {
  return (
    <div className="progress-container">
      <div className="progress-details">
        <WorkspacePremiumOutlinedIcon backgroundColor='#fff'  sx={{ fontSize: 40, color:'#F8D210' }} />
        <p className="progress-desc">{workouts ? workouts : "--"}</p>
        <p className="progress-desc">Workouts</p>
      </div>

      <div className="progress-details">
        <WhatshotIcon  backgroundColor='#fff'  sx={{ fontSize: 40,color:'#FFA500'}} />
        <p className="progress-desc">{kcal ? kcal : "--"}</p>
        <p className="progress-desc">Kcal</p>
      </div>

      <div className="progress-details">
        <AccessTimeIcon backgroundColor='#fff'  sx={{ fontSize: 40,color:'#000' }} />
        <p className="progress-desc">{time ? time : "--"}</p>
        <p className="progress-desc">Minutes</p>
      </div>
    </div>
  )
}