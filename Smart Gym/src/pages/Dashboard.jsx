// import React from 'react'
import logo from '../assets/logo.png'
import "../css/Dashboard.css";
import Avatar from '@mui/material/Avatar';
import LeftSection from '../components/LeftSection';
import RightSection from '../components/RightSection';
import { useNavigate } from 'react-router-dom';
// const navigate=useNavigate();
const Dashboard = () => {
  return (
    <>
    <div className='header'>
      <div className='brand'>
        <img src={logo} alt="logo" className='logo' />
        <h1>Smart Gym</h1>
      </div>
      <div className='avatar'>
        <Avatar
          alt="User Avatar"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 34, height: 34 }}
        />
      </div>
    </div>

    <div className='container'>
      <div className="left-section">
        <LeftSection />
      </div>
      
      <div className='line'></div>
      
      <div className="right-section">
        <RightSection />
      </div>
    </div>
  </>
  )
}

export default Dashboard;