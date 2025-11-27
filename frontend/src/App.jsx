import { useState } from 'react';
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar.jsx";

import Signup from './pages/signup';
import Login from './pages/login';
import Dashboard from './pages/dashboard.jsx';
import Add from './pages/ader.jsx';

import ProtectedRoute from "./protectedroute.jsx";   

function App() {
  const [memories, setMemories] = useState([]);

  return (
    <>
      {/* Optional: Navbar ko har page par show karna hai?  
          Agar sirf logged in pages par chahiye to 
          ProtectedRoute wale pages me Navbar rakhenge. */}
      {/* <Navbar /> */}

      <Routes>

        {/* Public Routes (login / signup) */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard memories={memories} setMemories={setMemories} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/ader"
          element={
            <ProtectedRoute>
              <Add />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;
