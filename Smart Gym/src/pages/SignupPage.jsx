import React, { useState } from "react";
import "../css/SignupPage.css";
import backGroundImage from "../assets/BodyBuilderImage.jpg";
import { Link } from "react-router-dom";
import axios from "axios"
const SignupPage=() =>{

  const [fullName,setFullName]=useState()
  const[email,setEmail]=useState()
  const [password,setPassword]=useState()
  const[confirmPassword,setConfirmPassword]=useState()
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if (password==confirmPassword) {
      await axios.post("/api/v1/users/register",{fullName,email,password,confirmPassword})
      .then((result)=>console.log(result))
      .catch(err=>console.log(err))
    } else {
      console.log("create and confirm password should be same")
    }
  }
  return (
    <div className="container">
      <div className="leftDiv">
        <div>
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
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          {/* <div className="heading">Gender</div>
          <div>
            <select className="inputFieldSelect">
              <option value="" disabled selected>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div> */}
          
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
