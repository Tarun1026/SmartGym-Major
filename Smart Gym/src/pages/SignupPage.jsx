import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css"; // Create and link a CSS file for styling

import backGroundImage from "../assets/BodyBuilderImage.jpg"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignupPage=() =>{

  const [fullName,setFullName]=useState()
  const[email,setEmail]=useState()
  const [password,setPassword]=useState()
  const[confirmPassword,setConfirmPassword]=useState()
  const [emailError, setEmailError] = useState("");
  const navigate=useNavigate()

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
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) return;
    if (password==confirmPassword) {
      const res= await axios.post("/api/v1/users/register",{fullName,email,password,confirmPassword})
      if(res.data.success){
        toast.success(' Registered Sucessfully!', {
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
             navigate('/login')
          }, 3000);
          
      }else{
        setMsg(true)
        toast.error(' User Already Exists! Please Log In ', {
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
    } else {
      toast.error("Passwords must be same");
    }
  }
  return (
    <div className="container">
      <ToastContainer />
      <div className="leftDiv">
        <div className='leftDiv_Img'>
          <img src={backGroundImage} className="bgImage" alt="Example" />
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}> */}
      <div className="rightDivs">
        <div className="containRightDiv">
          <h2 className="mainHeading">Account Signup</h2>
          <div className="heading">Full Name</div>
          <div>
            <input
              className="inputField"
              type="text"
              placeholder="Enter your Full Name"
              onChange={(e)=>setFullName(e.target.value)}
            />
          </div>
          <div className="heading">Email</div>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Enter your Email"
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value); // Validate on change
              }}
            />
            {emailError && <div className="errorText">{emailError}</div>} {/* Error message */}
          </div>
          
          <div className="heading">Create Password</div>
          <div>
            <input
              className="inputField"
              type="password"
              placeholder="Create a Password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="heading">Confirm Password</div>
          <div>
            <input
              className="inputField"
              type="password"
              placeholder="Confirm  Password"
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="loginLink">
            Already have an account?
            <Link to="/login" className="loginLinkColour">
              Login
            </Link>
          </div>
          <div className="signupBtn">
            <button className="btn" onClick={handleSubmit} >SignUp</button>
          </div>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
}

export default SignupPage;
