import React from 'react';
import { BMRProps} from '../CalculatorPage/CalculatorPage';
import { ShowDiet } from './ShowDiet';
import { ShowTarget } from './showtarget';
import './CreateDietPage.css';


// I used this component to set together other components, which create the whole Create Diet page
const CreateDietPage: React.FC<BMRProps> = ({ bmr, handleBMR }) => {
 
  // I used the map function to display the list with diets
  return (
    <div className="create-diet-container">
      <header>
        <h1>Create Diet</h1>
        <h3>Choose your diet</h3>
      </header>
      <div>
        <ShowDiet bmr={bmr} handleBMR={handleBMR}/>
      </div>
      <div>
        <ShowTarget bmr={bmr} handleBMR={handleBMR} />
      </div>
    </div>
  );
};

export default CreateDietPage;

