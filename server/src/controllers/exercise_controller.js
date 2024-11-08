import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import calorieData from "../utils/calorieData.js";
import { ExerciseData } from "../models/exercisedata.model.js";

const submitExerciseData = asyncHandler(async (req, res) => {
  const { date, exercises, timeTaken } = req.body;

  if (!exercises || !Array.isArray(exercises) || exercises.length === 0) {
    throw new ApiError(
      400,
      "Exercises data is required and should be an array"
    );
  }

  let totalCalories = 0;

  exercises.forEach((exercise, index) => {
    const { name, count } = exercise;

    if (!name || typeof count !== "number") {
      console.log("Invalid exercise name or count ");
      throw new ApiError(400, `Exercise at index ${index} not coorect`);
    }

    const caloriesPerUnit = calorieData[name];

    if (caloriesPerUnit === undefined) {
      throw new ApiError(400, `Calorie data for exercise "${name}" not found`);
    }

    const caloriesBurned = caloriesPerUnit * count;
    totalCalories += caloriesBurned;
  });

  const totalTimeTaken = timeTaken || 0;

  const exerciseData = new ExerciseData({
    userId: req.user._id,
    date: date || new Date(),
    exercises,
    caloriesBurned: totalCalories,
    timeTaken: totalTimeTaken,
  });

  await exerciseData.save();

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { exerciseData, totalCalories },
        "Exercise data submitted successfully"
      )
    );
});

export { submitExerciseData };
