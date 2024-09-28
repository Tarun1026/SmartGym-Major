import { User } from "../models/user.model.js"; // Import the user model
import { spawn } from 'child_process';

export default async function handler(req, res) {
  // console.log("heello");
  if (req.method === 'POST') {
    const { bmi, fitnessLevel, fitnessGoal } = req.body;
    console.log(bmi, fitnessLevel, fitnessGoal);

    // Call the Python script with the input
    const pythonProcess = spawn('python', [
      "T:/Smart_Gym_Project/server/py/recommendation.py",
      bmi,
      fitnessLevel,
      fitnessGoal
    ]);

    let exerciseData = ""; // Variable to store the data from Python

    // Handle the output from the Python script
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Received data from Python: ${data}`);
      exerciseData += data.toString(); // Accumulate the data
    });

    // Handle any errors from the Python script
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error from Python: ${data}`);
      res.status(500).json({ error: 'Error running Python script' });
    });

    // Handle the exit event from the Python script
    pythonProcess.on('exit', async (code) => {
      console.log(`Python script exited with code ${code}`);
      if (code === 0) {
        try {
          const userId = "66f7f0157360b5a20f5783d4"; // Replace with actual user ID
          const user = await User.findById(userId);

          if (user) {
            // Parse the received data as JSON
            user.exerciseRecommendation = JSON.parse(exerciseData);
            await user.save({ validateBeforeSave: false });
            res.status(200).json({ message: 'Exercise recommendations stored successfully!' });
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error saving exercise recommendations' });
        }
      } else {
        res.status(500).json({ error: 'Python script failed' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
