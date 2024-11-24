import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css"; // Create and link a CSS file for styling

import backGroundImage from "../assets/BodyBuilderImage.jpg"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    const commonDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
  
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email");
      return false;
    } else {
      const emailDomain = email.split("@")[1];
      if (!commonDomains.includes(emailDomain)) {
        setEmailError(`Please enter a valid email`);
        return false;
      }
      setEmailError(""); 
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/users/logins", { email, password });
      console.log(res);
      if(res.data.success){
        toast.success(' Login Sucessfully!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          setTimeout(() => {
            navigate("/recommend")
          }, 3000);
          
      }else{
        setMsg(true)
        toast.error('Enter valid Email and password', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        }
    } catch (err) {
      console.log(err);
      toast.error("Login failed");
    }
  };

  return (
    <div className='container'>
      <ToastContainer /> {/* Toast container to display messages */}
      <div className='leftDiv'>
        <div className='leftDiv_Img'>
          <img src={backGroundImage} className='bgImage' alt="Example" />
        </div>
      </div>
      <div className='rightDiv'>
        <div className='containRightDiv'>
          <h2 className='mainHeading'>Account Login</h2>
          <div className='heading'>Email</div>
          <div>
            <input 
              className='inputField' 
              type="email" 
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
            />
            {emailError && <div className="errorText">{emailError}</div>} {/* Error message */}
          </div>
          <div className='heading'>Password</div>
          <div>
            <input 
              className='inputField' 
              type="password" 
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
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
            <button className='btn' onClick={handleSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
