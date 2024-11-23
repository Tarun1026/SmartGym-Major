
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import './App.css';
import RecommendationPage from './pages/RecommendationPage';

import PersonDayExercise from './pages/PersonDayExercise';
import RecommendedPage from './pages/RecommendedPage'
import Dashboard from "./pages/Dashboard"
import Exercise from './pages/Exercisepage';
import Exercise2 from './pages/UserExercise';
import Sample from './pages/SamplePage';
import ExerciseScreen from './pages/ExerciseScreen';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recommend" element={<RecommendationPage/>} />
        <Route path="/get-recommend" element={<RecommendedPage/>}/>

        <Route path="/person-exercise" element={<PersonDayExercise />} />
        
        <Route path="/sample" element={<Sample />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/exercise2" element={<Exercise2 />} />

        <Route path="/exerciseScreen" element={<ExerciseScreen />} />


      </Routes>
    </Router>
  );
}

export default App;
