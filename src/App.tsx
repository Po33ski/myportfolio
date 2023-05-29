import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import {CalculatorPage, BMRProps} from './components/CalculatorPage/CalculatorPage';
import ContactPage from './components/ContactPage/ContactPage';
import Navbar from './components/Navbar/Navbar';
import Login from "./components/Login/Login";
import './App.css';
import CreateDietPage from './components/CreateDietPage/CreateDietPage';


export const App: React.FC= () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [BMR, setBMR] = useState<number>(0);
  
  const handleLogin = () => {
    setIsLoggedIn(true); // set login as true
  };
 // I add the properties bmr and handleBMR to 2 pages on the purpose to hanlde the same value (bmr) on the 2 pages.
  return (
    <Router>
       {!isLoggedIn ? (
        <Login handleLogin={handleLogin} />
      ) : (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/calculator" element={<CalculatorPage bmr={BMR} handleBMR={setBMR}/>} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/create-diet" element={<CreateDietPage bmr={BMR} handleBMR={setBMR} />} />
      </Routes>
    </div> )}
  </Router>
  );
};

export default App;

