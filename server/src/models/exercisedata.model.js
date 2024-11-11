import mongoose from "mongoose";

// const exerciseSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   count: {
//     type: Number,
//     required: true,
//   },
// });

const exerciseDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
fullName:{
  type:String
},
  // date: {
  //   type: Date,
  //   default: Date.now,
  // },
  // exercises: [exerciseSchema],
  caloriesBurned: {
    type: Number,
    default:0,
    required: true,
  },
  timeTaken: {
    type: Number,
    default:0,
    required: true,
  },
  workout:{
    type:Number,
    default:0,
    required:true,
  }
},{timestamps:true});

export const ExerciseData = mongoose.model("ExerciseData", exerciseDataSchema);
