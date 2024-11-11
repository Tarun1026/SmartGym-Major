import React, { useEffect, useState } from 'react'
import GaugeChart from 'react-gauge-chart'
import axios from "axios"
export default function Bmi() {
    const [bmi, setBmi] = useState(0);
    const [category, setCategory] = useState("");
    const [categoryColor, setCategoryColor] = useState("black");

    const fetchWorkOutSummary=async()=>{
        try {
            const response=await axios.get('/api/v1/users/current-user-details')
            console.log("BMI",response.data.data)
            setBmi(response.data.data.bmi/10)
        } catch (error) {
            console.log("BMI progress",error)
        }
    }
    useEffect(()=>{
        fetchWorkOutSummary()
    },[])
    // useEffect(()=>{
    //     setBmi(16)
    // },[])
    useEffect(() => {
        if (bmi >= 16 && bmi <= 18.5) {
            setCategory("Underweight");
            setCategoryColor("#d3d300");
        } else if (bmi > 18.5 && bmi < 25) {
            setCategory("Healthy");
            setCategoryColor("green");
        } else if (bmi >= 25 && bmi <= 30) {
            setCategory("Overweight");
            setCategoryColor("red");
        }
    }, [bmi]); 

    const gageCalc = (bmi) => {
        let result = 0;
        if (bmi >= 16 && bmi <= 18.5) {
            result = getPercentage(bmi, 16, 18.5, 0);
        } else if (bmi > 18.5 && bmi < 25) {
            result = getPercentage(bmi, 18.5, 25, 0.33);
        } else if (bmi >= 25 && bmi <= 30) {
            result = getPercentage(bmi, 25, 30, 0.66);
        }
        return result;
    };

    function getPercentage(bmi, lowerBound, upperBound, segmentAdjustment) {
        return (
            ((bmi - lowerBound) / (upperBound - lowerBound)) / 3 + segmentAdjustment
        );
    }

  return (
    <div style={{height:"250px", width:"400px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", marginLeft :"30px" }}>
      <GaugeChart id="gauge-chart1" percent={gageCalc(bmi)} nrOfLevels={3}
       colors={["#eeee01", "#228B22", "#FF0000"]}
       needleColor="black" needleBaseColor="black" hideText={true}
       />
       <h1 style={{ color: categoryColor , marginTop:"10px" ,fontSize:"25px"}}>{category}</h1>
    </div>
  )
}