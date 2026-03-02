import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from './components/landerpage';
import Signup from './components/Signup';

import StudentSignup from './components/StudentSignup';
import AlumniSignup from './components/AlumniSignup';
import AdminSignup from './components/AdminSignup';


function App() {

  return (

    <BrowserRouter>

      <div className="App">

        <Routes>

          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />


          {/* Main Signup Role Selection */}
          <Route path="/signup" element={<Signup />} />


          {/* Role Based Signup Pages */}

          <Route path="/signup/student" element={<StudentSignup />} />

          <Route path="/signup/alumni" element={<AlumniSignup />} />

          <Route path="/signup/admin" element={<AdminSignup />} />


        </Routes>

      </div>

    </BrowserRouter>

  );

}

export default App;