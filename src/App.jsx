import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  // ✅ THIS creates setToken
  const [token, setToken] = useState(null);

  // Load token on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login setToken={setToken} /> : <Navigate to="/dashboard" replace />}
        />

        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/dashboard" replace />}
        />

       <Route
        path="/dashboard"
        element={
         token
         ? <Dashboard setToken={setToken} />
         : <Navigate to="/login" replace />
          }
       />

        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
