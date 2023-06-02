import {useState} from 'react';
import {BMRProps} from '../CalculatorPage/CalculatorPage';
import './CreateDietPage.css';


interface DietOption {
    name: string;
    carbohydrates: number;
    proteins: number;
    fats: number;
  };
// This component shows every type of diet using list
export const ShowDiet: React.FC<BMRProps> = ({ bmr }) => {
    const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
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
        {
        name: 'Low-carb Diet',
        carbohydrates: Math.round(bmr * 0.2),
        proteins: Math.round(bmr * 0.4),
        fats: Math.round(bmr * 0.4),
        },
    ];

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dietName = event.target.value;
        setSelectedDiets((prevSelectedDiets) => {
          if (prevSelectedDiets.includes(dietName)) {
            return prevSelectedDiets.filter((diet) => diet !== dietName);
          } else {
            return [...prevSelectedDiets, dietName];
          }
        });
      };

    return (
    <div>
        <div>
        <div>
            <form>
                <fieldset>
                <legend>Your favorite diets</legend>
                {dietOptions.map((dietOption) => (
                    <label key={dietOption.name}>
                    <input
                        type="checkbox"
                        name={dietOption.name}
                        value={dietOption.name}
                        checked={selectedDiets.includes(dietOption.name)}
                        onChange={handleCheckboxChange}
                    />
                    {dietOption.name}
                    </label>
                ))}
                </fieldset>
            </form>
        </div>
        <h4>If you want to keep your weight you have to eat daily: {bmr} kcal</h4>
        <h4>You should eat daily depending on your diet: </h4>
        {dietOptions
            .filter((dietOption) => selectedDiets.includes(dietOption.name))
            .map((dietOption, index) => (
                <div key={index} className="diet-option">
                <h3>{dietOption.name}</h3>
                <div className="diet-progress">
                <div
                    className="diet-progress-bar carbohydrates-bar"
                    style={{ width: `${(dietOption.carbohydrates / bmr) * 100}%` }}
                >
                </div>
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



/*
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
      */