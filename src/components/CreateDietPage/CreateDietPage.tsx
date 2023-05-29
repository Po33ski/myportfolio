import React, { useState } from 'react';
import {CalculatorPage, BMRProps} from '../CalculatorPage/CalculatorPage';
import './CreateDietPage.css';



interface DietOption {
  name: string;
  carbohydrates: number;
  proteins: number;
  fats: number;
}

// This component shows every type of diet using list
const CreateDietPage: React.FC<BMRProps> = ({ bmr }) => {
  // This is list with each kind of diet
  const dietOptions: DietOption[] = [
    // diet options data...
    {
      name: 'Fit Diet',
      carbohydrates: Math.round(bmr * 0.6),
      proteins: Math.round(bmr * 0.35),
      fats: Math.round(bmr * 0.15),
    },
    {
      name: 'Keto Diet',
      carbohydrates: Math.round(bmr * 0.1),
      proteins: Math.round(bmr * 0.3),
      fats: Math.round(bmr * 0.6),
    },
    {
      name: 'Mediterranean Diet',
      carbohydrates: Math.round(bmr * 0.6),
      proteins: Math.round(bmr * 0.2),
      fats: Math.round(bmr * 0.2),
    },
  ];
  // I used the map function to display the list with diets
  return (
    <div className="create-diet-container">
      <header>
        <h1>Create Diet</h1>
      </header>
      <div>
        <p>You should eat daily depending on your diet:</p>
        {dietOptions.map((dietOption, index) => (
          <div key={index} className="diet-option">
            <h3>{dietOption.name}</h3>
            <div className="diet-progress">
              <div
                className="diet-progress-bar carbohydrates-bar"
                style={{ width: `${(dietOption.carbohydrates / bmr) * 100}%` }}
              ></div>
              <div
                className="diet-progress-bar proteins-bar"
                style={{ width: `${(dietOption.proteins / bmr) * 100}%` }}
              ></div>
              <div
                className="diet-progress-bar fats-bar"
                style={{ width: `${(dietOption.fats / bmr) * 100}%` }}
              ></div>
            </div>
            <ul className="calorie-info">
              <li>Carbohydrates: {dietOption.carbohydrates} calories</li>
              <li>Proteins: {dietOption.proteins} calories</li>
              <li>Fats: {dietOption.fats} calories</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateDietPage;















/*
  interface dietData {
    protein: number;
    carbohydrates: number;
    fats: number;
  };

  const CreateDietPage: React.FC<BMRProps> = ({bmr}) => {
    
    return (
      <div>
        <header>
          <h1>Create Diet</h1>
        </header>
        <div>
          <p>You should eat daily</p>
        </div>
      </div>

    );
  };
  
  export default CreateDietPage;


*/