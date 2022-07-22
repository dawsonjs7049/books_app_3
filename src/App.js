import React from 'react';
import Login from './components/Login';
import Home from './components/Home';
import styles from "./styles/globals.css";
import { Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from './context/UserAuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
{/* 

        <Route path="/" element={<Login />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>} 
        /> */}
      </Routes>
    </UserAuthContextProvider>

  );
}

export default App;