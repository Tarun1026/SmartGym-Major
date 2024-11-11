import { asyncHandler } from "../utils/asynchronousHandler.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import calorieData from "../utils/calorieData.js";
import { ExerciseData } from "../models/exercisedata.model.js";

const submitExerciseData = asyncHandler(async (req, res) => {
  const { storedCounts, duration } = req.body;
console.log("exercise")
  let totalCalories = 0;
  let total_exercise = 0;

  // Calculate total_exercise and calories burned
  Object.entries(storedCounts).forEach(([name, count]) => {
    if (count > 0) {
      total_exercise += 1;
console.log("hello")
      const caloriesPerUnit = calorieData[name];
      if (caloriesPerUnit === undefined) {
        console.log("error")
        throw new ApiError(400, `Calorie data for exercise "${name}" not found`);
        
      }

      const caloriesBurned = caloriesPerUnit * count;
      totalCalories += caloriesBurned;
    }
  });

  const totalTimeTaken = duration || 0;

  const exerciseData = await ExerciseData.create({
    userId: req.user._id,
    workout: total_exercise,
    caloriesBurned: Math.floor(totalCalories),
    timeTaken: totalTimeTaken,
    fullName:req.user.fullName
  });
console.log("gg",exerciseData)
  // await exerciseData.save();

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
       exerciseData,
        "Exercise data submitted successfully"
      )
    );
});

export { submitExerciseData };
