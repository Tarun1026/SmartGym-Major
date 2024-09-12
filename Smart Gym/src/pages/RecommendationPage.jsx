import React from "react";
import "../css/RecommendationPage.css";

function RecommendationPage() {
  return (
    <div className="container">
        
      <div className="form">
        <h2 className="heading">Get Started</h2>
        <div className="description">
          Tell us about yourself to create your first custom workout
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender" className="select-field">
            <option value="" disabled selected>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight</label>
          <div className="weight-container">
            <input
              id="weight-kg"
              type="number"
              className="input-field weight-input"
              placeholder="Kg"
              min="0"
            />
            <input
              id="weight-g"
              type="number"
              className="input-field weight-input"
              placeholder="Grams"
              min="0"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="height">Height</label>
          <div className="height-select">
            <select id="feet" className="select-field">
              <option value="" disabled selected>
                Feet
              </option>
              {[...Array(10).keys()].map(i => (
                <option key={i} value={i + 1}>{i + 1} ft</option>
              ))}
            </select>
            <select id="inches" className="select-field">
              <option value="" disabled selected>
                Inches
              </option>
              {[...Array(12).keys()].map(i => (
                <option key={i} value={i}>{i} inch</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="fitness-level">Fitness Level</label>
          <select id="fitness-level" className="select-field">
            <option value="" disabled selected>
              Select Fitness Level
            </option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fitness-goal">Fitness Goal</label>
          <select id="fitness-goal" className="select-field">
            <option value="muscle-build">Muscle Build</option>
            <option value="increase-strength">Increase Strength</option>
            <option value="improve-endurance">Improve Endurance</option>
            <option value="fat-loss">Fat Loss</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="muscles-per-day">How many muscles you can do per day?</label>
          <select id="muscles-per-day" className="select-field">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="full-body">Full Body Workout</option>
          </select>
        </div>
        <div className="button-container">
          <button className="submit-button">Get Plan</button>
        </div>
      </div>
    </div>
  );
}

export default RecommendationPage;
