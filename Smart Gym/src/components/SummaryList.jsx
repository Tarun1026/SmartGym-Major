import React from 'react'
import '../css/SummaryList.css'; 
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


export default function SummaryList({ image, title, workoutTime, kcal, time, date }) {
  return (
    <div className="summary">
            <div className="summaryDet">
                <div className="imageCont">
                    <img className="image" src={image} alt={title} />
                </div>
                <div className="details">
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <span style={{ fontWeight: '500' }}>{date}, </span>
                        <span style={{ fontWeight: '500' }}>{time}</span>
                    </div>
                    <div>
                        <h3 style={{ fontWeight: '900', fontSize: '20px', marginBottom: '7px', marginTop: '6px' }}>
                            {title}
                        </h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <span style={{display:"flex", alignItems:"center"}} >
                        <AccessTimeIcon backgroundColor='#fff'  sx={{ fontSize: 30,color:'#000' }} />
                        <span>{workoutTime}</span>
                        </span>
                        <span style={{display:"flex", alignItems:"center", marginLeft:"10px"}}>
                        <WhatshotIcon  backgroundColor='#fff'  sx={{ fontSize: 30,color:'#FFA500'}} /> 
                        <span>{kcal}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
  )
}