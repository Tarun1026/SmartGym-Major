import  { useState } from "react";
import "../css/RecommendationPage.css";
import { useNavigate } from "react-router-dom";

function RecommendationPage() {
  const [gender, setGender] = useState("");
  const [weightKg, setWeightKg] = useState(0);
  const [weightG, setWeightG] = useState(0);
  const [heightFeet, setHeightFeet] = useState(0);
  const [heightInches, setHeightInches] = useState(0);
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");
  const navigate=useNavigate()

  const totalWeight = weightKg + weightG / 1000;

  const totalHeight = (heightFeet * 0.3048) + (heightInches * 0.0254);

  const bmi = totalHeight > 0 ? totalWeight / (totalHeight * totalHeight) : 0;

  const handleSubmit = async () => {
    const data = {
      bmi,
      fitnessLevel,
      fitnessGoal,
    };
    console.log(fitnessGoal,fitnessLevel,bmi);
    try {
      const response = await fetch("http://localhost:5000/api/scriptpy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Recommended Plan:", result);
      navigate('/dashboard')
    } catch (error) {
      console.error("Error fetching recommendation:", error);
    }
  };

  return (
    <div className="container1">
      <div className="form">
        <h2 className="heading">Get Started</h2>
        <div className="description">
          Tell us about yourself to create your first custom workout
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            className="select-field"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled>
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
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
            />
            <input
              id="weight-g"
              type="number"
              className="input-field weight-input"
              placeholder="Grams"
              min="0"
              value={weightG}
              onChange={(e) => setWeightG(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="height">Height</label>
          <div className="height-select">
            <select
              id="feet"
              className="select-field"
              value={heightFeet}
              onChange={(e) => setHeightFeet(e.target.value)}
            >
              <option value="" disabled>
                Feet
              </option>
              {[...Array(10).keys()].map(i => (
                <option key={i} value={i + 1}>{i + 1} ft</option>
              ))}
            </select>
            <select
              id="inches"
              className="select-field"
              value={heightInches}
              onChange={(e) => setHeightInches(e.target.value)}
            >
              <option value="" disabled>
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
          <select
            id="fitness-level"
            className="select-field"
            value={fitnessLevel}
            onChange={(e) => setFitnessLevel(e.target.value)}
          >
            <option value="" disabled>
              Select Fitness Level
            </option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fitness-goal">Fitness Goal</label>
          <select
            id="fitness-goal"
            className="select-field"
            value={fitnessGoal}
            onChange={(e) => setFitnessGoal(e.target.value)}
          >
            <option value="Muscle Gain">Muscle Gain</option>
            
            <option value="Bicep Gain">Bicep Gain</option>
            <option value="Fat Loss">Fat Loss</option>
          </select>
        </div>
        
        <div className="button-container">
          <button className="submit-button" onClick={handleSubmit}>Get Plan</button>
        </div>
      </div>
    </div>
  );
}

export default RecommendationPage;
