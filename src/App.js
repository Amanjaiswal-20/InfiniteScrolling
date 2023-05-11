import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Login from './Login'; // Replace './Login' with the correct path to your Login component
import Home from './Home'; // Replace './Home' with the correct path to your Home component

const App = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // You can use any method to check if the user is authenticated

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
