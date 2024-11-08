
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import './App.css';
import RecommendationPage from './pages/RecommendationPage';

import PersonDayExercise from './pages/PersonDayExercise';

import Dashboard from "./pages/Dashboard"
import ExercisePage from './pages/exercisepage';
import RecommendedPage from './pages/RecommendedPage';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<SignupPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/recommend" element={<RecommendationPage />} />
        <Route path="/get-recommend" element={<RecommendedPage/>}/>

        <Route path="/person-exercise" element={<PersonDayExercise />} />
        

        <Route path="/exercise" element={<ExercisePage />} />

      </Routes>
    </Router>
  );
}

export default App;
