const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const exerciseDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  exercises: [exerciseSchema],
  caloriesBurned: {
    type: Number,
    required: true,
  },
  timeTaken: {
    type: Number,
    required: true,
  },
});

export const ExeerciseData = mongoose.model("ExerciseData", exerciseDataSchema);
