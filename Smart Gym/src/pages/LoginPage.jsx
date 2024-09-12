import React from 'react';
import { Link } from 'react-router-dom';
import "../css/LoginPage.css"; // Create and link a CSS file for styling
import backGroundImage from "../assets/BodyBuilderImage.jpg"

const LoginPage=() =>{
  return (
    <div className='container'>
      <div className='leftDiv'>
        <div>
        <img src={backGroundImage} className='bgImage' alt="Example" />
        </div>
      </div>
      <div className='rightDiv'>
        <div className='containRightDiv'>
          <h2 className='mainHeading'>Account Login</h2>
          <div className='heading'>Email</div>
          <div>
            <input className='inputField' type="email" placeholder="Enter your email" />
          </div>
          <div className='heading'>Password</div>
          <div>
            <input className='inputField' type="password" placeholder="Enter your password" />
          </div>
          <div className="rememberMe">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe" className='rem'> Remember Me</label>
          </div>
          <div className="signupLink">
            Don't have an account?
            <Link to="/signup" className="signupLinkColour">
              Signup
            </Link>
          </div>
          <div className='loginBtn'>
            <button className='btn'>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
