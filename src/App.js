import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar.jsx"; // Student Navbar
import Navbar1 from "./components/Navbar1.jsx"; // Recruiter Navbar
import Footer from "./components/Footer.jsx"; 
import Home from "./pages/Home.jsx"; 
import Industry from "./pages/Industry.jsx"; 
import Profile from "./pages/Profile.jsx"; 
import Projects from "./pages/Projects.jsx"; 
import Dashboard from "./pages/Dashboard.jsx"; 
import BrowseProjects from "./pages/BrowseProjects.jsx"; 
import ContactStudents from "./pages/ContactStudents.jsx"; 
import PostChallenges from "./pages/PostChallenges.jsx"; 
import Shortlisted from "./pages/Shortlisted.jsx"; 
import Login from "./pages/Login.jsx"; 
import Signup from "./pages/Signup.jsx"; 
import StudentDashboard from "./pages/Dashboard.jsx"; 
import RecruiterDashboard from "./pages/BrowseProjects.jsx"; 
import FeedbackSection from "./components/FeedbackSection.jsx"; 
import PortfolioSection from "./components/PortfolioSection.jsx"; 
import "./App.css";

function LayoutWrapper({ children }) {
  const location = useLocation();
  
  // Hide Navbar & Footer on Signup and Login Pages
  const isAuthPage = location.pathname === "/signup" || location.pathname === "/login"; 
  // Show Recruiter Navbar for Recruiter Pages
  const isRecruiterPage = ["/recruiter-dashboard", "/browse-projects", "/contact-students", "/post-challenges", "/shortlisted"].includes(location.pathname);

  return (
    <div>
      {/* Show Navbar only when NOT on Signup/Login */}
      {!isAuthPage && (isRecruiterPage ? <Navbar1 /> : <Navbar />)}

      <div className="App min-h-screen bg-gradient-to-b from-dark-100 to-dark-200">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {children}
        </motion.div>
      </div>

      {/* Show Footer only when NOT on Signup/Login */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* Step 1: App starts at Signup (No Navbar, No Footer) */}
          <Route path="/" element={<Navigate replace to="/signup" />} />
          <Route path="/signup" element={<Signup />} />

          {/* Step 2: After Signup, go to Login (No Navbar, No Footer) */}
          <Route path="/login" element={<Login />} />

          {/* Step 3: After Login, Redirect Based on Role */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />

          {/* Recruiter Pages (Uses Navbar1) */}
          <Route path="/browse-projects" element={<BrowseProjects />} />
          <Route path="/contact-students" element={<ContactStudents />} />
          <Route path="/post-challenges" element={<PostChallenges />} />
          <Route path="/shortlisted" element={<Shortlisted />} />

          {/* Student Pages (Uses Navbar) */}
          <Route path="/home" element={<Home />} />
          <Route path="/industry" element={<Industry />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;