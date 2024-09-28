// import { User } from "../models/user.model.js";// Import the user model
// import { spawn } from 'child_process';

// export default async function handler(req, res) {
//   console.log("heello");
//   if (req.method === 'POST') {
//     const { bmi, fitnessLevel, fitnessGoal } = req.body;
//      console.log(bmi, fitnessLevel, fitnessGoal);

//     // Call the Python script with the
//     const pythonProcess = spawn('python', ['D:/smartgym/SmartGym-Major/server/py/recommendation.py', bmi, fitnessLevel, fitnessGoal]);


//     // Capture Python output
//     pythonProcess.stdout.on('data', async (data) => {
//       console.log("this hello");
//       console.log(data);
//       const recommendedPlan = JSON.parse(data.toString());
//       console.log(`Recommended plan: ${recommendedPlan}`);

    
//       const userId = "66f6ebf30131af48865577d0"; 
//       await User.findByIdAndUpdate(userId, { exerciseRecommendation: recommendedPlan });

//       return res.status(200).json({ success: true, plan: recommendedPlan });
//     });

//     // Capture Python errors
//     pythonProcess.stderr.on('data', (data) => {
//       console.error(`Python error: ${data}`);
//       return res.status(500).json({ success: false, error: 'Python script error' });
//     });
//   } else {
//     res.status(405).json({ success: false, message: 'Only POST method is allowed' });
//   }
// }
import { User } from "../models/user.model.js";// Import the user model
import { spawn } from 'child_process';

export default async function handler(req, res) {
  console.log("heello");
  if (req.method === 'POST') {
    const { bmi, fitnessLevel, fitnessGoal } = req.body;
     console.log(bmi, fitnessLevel, fitnessGoal);

    // Call the Python script with the
    const pythonProcess = spawn('python', ['D:/smartgym/SmartGym-Major/server/py/recommendation.py ', bmi, fitnessLevel, fitnessGoal]);

    // Handle the output from the Python script
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Received data from Python: ${data}`);
      res.status(200).json(JSON.parse(data));
    });

    // Handle any errors from the Python script
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error from Python: ${data}`);
      res.status(500).json({ error: 'Error running Python script' });
    });

    // Handle the exit event from the Python script
    pythonProcess.on('exit', (code) => {
      console.log(`Python script exited with code ${code}`);
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
