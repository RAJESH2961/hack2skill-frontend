import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./components/AboutUs";
import Contact from "./pages/Contact";

function AppContent() {
  const { isLoggedIn, logout } = useAuth();

  // Component to handle root route redirection
  const RootRedirect = () => {
    return isLoggedIn ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
  };

  // Component to redirect logged-in users away from login page
  const LoginRedirect = () => {
    return isLoggedIn ? <Navigate to="/home" replace /> : <Login />;
  };

  // Component to redirect logged-in users away from signup page
  const SignupRedirect = () => {
    return isLoggedIn ? <Navigate to="/home" replace /> : <Signup />;
  };

  return (
    <div className="app-container">
      {/* floating background orbs */}
      <div className="orb one" />
      <div className="orb two" />
      <div className="orb three" />
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<LoginRedirect />} />
          <Route path="/signup" element={<SignupRedirect />} />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/about" 
            element={
              <ProtectedRoute>
                <AboutUs />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
