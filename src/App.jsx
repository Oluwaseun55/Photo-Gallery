// App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import Gallery from "./components/Gallery";
import UploadForm from "./components/UploadForm";
import Login from "./components/Login";
import About from "./components/About";
import AdminImages from "./components/AdminImages";
import Footer from "./components/Footer";
import "./css/App.css";

// Protect admin-only routes
const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check session status from backend on first load
    fetch("http://localhost/Reactphoto/backend/auth/check_session.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) {
          setLoggedIn(true);
          localStorage.setItem("isAdmin", "true");
        } else {
          setLoggedIn(false);
          localStorage.removeItem("isAdmin");
        }
      })
      .catch(() => {
        setLoggedIn(false);
        localStorage.removeItem("isAdmin");
      });
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost/Reactphoto/backend/auth/logout.php", {
      credentials: "include",
    });
    setLoggedIn(false);
    localStorage.removeItem("isAdmin");
  };

  return (
    <>
      <Navbar isLoggedIn={loggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Gallery isAdmin={loggedIn} />} />
        <Route
          path="/login"
          element={<Login onLogin={() => setLoggedIn(true)} />}
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute isLoggedIn={loggedIn}>
              <UploadForm onUpload={() => alert("Upload complete!")} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/images"
          element={
            <ProtectedRoute isLoggedIn={loggedIn}>
              <AdminImages />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer isLoggedIn={loggedIn} />
    </>
  );
}

export default App;
