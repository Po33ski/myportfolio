import React, { useState, Suspense, createContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {MainPage} from './components/MainPage/MainPage';
import {CalculatorPage} from './components/CalculatorPage/CalculatorPage';
import {CreateTargetPage} from './components/TargetPage/TargetPage';
import { ShowDietPage } from './components/ShowDietPage/ShowDietPage';
import {ContactPage} from './components/ContactPage/ContactPage';
import {CreateDietPage} from './components/CreateDietPage/CreateDietPage';
import {Navbar} from './components/Navbar/Navbar';
import {Login} from "./components/Login/Login";
import './App.css';
//import {logIn, logOut} from "./components/redux/features/auth-slice";

export interface IappContextData  {
  bmr: number,
};
export interface IDietsResultsData {
  name : string,
  result : number,
};
/*
export interface IappContextDietData {
  resultDiets: Record<string, number>,
};
*/

export interface ICalculateCaloriesData {
  gender: string;
  age: number;
  weight: number;
  height: number;
  factorPAL: number;
};

export type appContextType = {
  BMR : IappContextData;
  ResultDiets: IDietsResultsData[];
  CalculateCaloriesData: ICalculateCaloriesData;
  handleBMR : (bmrData : number) => void;
  handleResultDiets : (rdData : IDietsResultsData[]) => void;
  handleCalculateCaloriesData : (calData : ICalculateCaloriesData) => void;
};

export const AppContext = createContext<appContextType | null>(null);

export const App: React.FC= () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false);
  const [BMR, setBMR] = useState<IappContextData>({ bmr : 1000});
  const [ResultDiets, setResultDiets] = useState<IDietsResultsData[]>([{name : '', result : 0}]);
  const [CalculateCaloriesData, setCalculateCaloriesData] = useState<ICalculateCaloriesData>({
    gender: "Man",
    age: 18,
    weight: 80,
    height: 180,
    factorPAL: 1
  });
  

  const handleBMR = (bmrData : number)  => {
    const newBmrData : IappContextData = {
      bmr: bmrData
    };
    setBMR(newBmrData);
  };

  const handleResultDiets = (resultDietsData : IDietsResultsData[]) => {
    const newResultDietsData : IDietsResultsData[] = []
    
    resultDietsData.forEach((data : IDietsResultsData) => {
      newResultDietsData.push(data)
  });
    
    setResultDiets(newResultDietsData);
  };

  const handleCalculateCaloriesData = (calculateCaloriesData : ICalculateCaloriesData) => {
    const newCalculateCaloriesData : ICalculateCaloriesData = {
      gender: calculateCaloriesData.gender,
      age: calculateCaloriesData.age,
      weight: calculateCaloriesData.weight,
      height: calculateCaloriesData.height,
      factorPAL: calculateCaloriesData.factorPAL,
    };
    setCalculateCaloriesData(newCalculateCaloriesData);
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // set login as true
  };
  const handleLogOut = () => {
    setIsLoggedIn(false); // set login as true
  };
 // I add the properties bmr and handleBMR to 2 pages on the purpose to hanlde the same value (bmr) on the 2 pages.
  return (
    <Router>
       {!isLoggedIn ? (
        <Login handleLogin={handleLogin} />
      ) : (
    <div className="app">
      <Navbar handleLogOut={handleLogOut}/>
      <Suspense fallback={<h1>Loading...</h1>}>
        <AppContext.Provider value={{
          BMR, 
          ResultDiets, 
          CalculateCaloriesData, 
          handleBMR, 
          handleResultDiets, 
          handleCalculateCaloriesData
        }} 
          >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/create-diet" element={<CreateDietPage  />} />
          <Route path="/create-target" element={<CreateTargetPage  />} />
          <Route path="/show-diet" element={<ShowDietPage  />} />
        </Routes>
        </AppContext.Provider>
      </Suspense>
    </div> )}
  </Router>
  );
};

export default App;


//////////////////////////////////////////

/*
  const handleBMR = (bmrData : appContextData)  => {
    const newBmrData : appContextData = {
      bmr: bmrData.bmr
    };
    setBMR(newBmrData);
  };
*/

//<Suspense fallback={<h1>Loading...</h1>}>