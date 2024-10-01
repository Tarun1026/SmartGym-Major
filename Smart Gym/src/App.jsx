
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import './App.css';
import RecommendationPage from './pages/RecommendationPage';
import Dashboard from "./pages/Dashboard"
import ExercisePage from './pages/exercisepage';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<SignupPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/recommend" element={<RecommendationPage />} />
        <Route path="/exercise" element={<ExercisePage />} />

      </Routes>
    </Router>
  );
}

export default App;
