import React, {useState, useContext, useEffect, useMemo} from 'react';
import { useForm } from "react-hook-form";
import { checkAnswers, calculateAHP } from '../../features/checkAnswers';
import { findDiet } from '../../features/calculateDietWeight';
import { ShowDietPage } from '../ShowDietPage/ShowDietPage';
import './CreateDietPage.css';
import { AppContext, IDietsResultsData, appContextType, IappContextData } from '../../App';
import { useNavigate } from 'react-router-dom';


export interface IDietCriteriaData {
  amount: number,
  wellBeing: number,
  health: number,
  price: number,
  moreFat: number,
  buildingMuscleMass: number,
};


// I used this component to set together other components, which create the whole Create Diet page
export const CreateDietPage: React.FC = () => {
  const bmrContext = useContext<appContextType | null>(AppContext);
 // const bmr = useContext(AppContext);
 const [isSub, setIsSubmitted] = useState<boolean | null>(false);
 const [isCorrect, setIsCorrect] = useState<boolean | null>(false);
 const [valueAhp, setAhp] = useState<Record<string, number> >({[''] : 0});
 //const [resultDiets, setResultDiets] = useState<Record<string, number>>({[''] : 0}); IDietsResultsData
 const [resultDiets, setResultDiets] = useState<IDietsResultsData[]>([]);
 //const [valueAhp, setAhp] = useState<Record<string, number>>({'':0});
 // useForm hook

 const getTheBestDiet = useMemo<IDietsResultsData[]>(() => 
  findDiet(valueAhp), 
  [resultDiets]
 );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IDietCriteriaData>();
  
  const onCreateCriteria = (data: IDietCriteriaData) => {
    if(checkAnswers(data)){
      setAhp(calculateAHP(data));
      setIsCorrect(true);
      setResultDiets(getTheBestDiet);
      bmrContext?.handleResultDiets(resultDiets);
    }
    else{
      data.amount = 0;
      data.wellBeing = 0;
      data.health = 0;
      data.price = 0;
      data.moreFat = 0;
      data.buildingMuscleMass = 0;
      setIsCorrect(false);
    };
  };

  useEffect(() => {
    document.addEventListener("submit", () =>  {
       setResultDiets(findDiet(valueAhp));
    });
  });

  const showCriteria = () => {
    return (
      <div>
        <div>{valueAhp["amount"]}</div>
        <div>{valueAhp["wellBeing"]}</div>
        <div>{valueAhp["health"]}</div>
        <div>{valueAhp["price"]}</div>
        <div>{valueAhp["moreFat"]}</div>
        <div>{valueAhp["buildingMuscleMass"]}</div>
      </div> );
  };

  const showDiets = () => {
    return (
      <div>
        <div> {bmrContext?.ResultDiets[0]?.name} : {bmrContext?.ResultDiets[0]?.result}  </div>
        <div>{bmrContext?.ResultDiets[1]?.name} : {bmrContext?.ResultDiets[1]?.result} </div>
        <div>{bmrContext?.ResultDiets[2]?.name} : {bmrContext?.ResultDiets[2]?.result} </div>
        <div>{bmrContext?.ResultDiets[3]?.name} : {bmrContext?.ResultDiets[3]?.result} </div>
        <div>{bmrContext?.ResultDiets[4]?.name} : {bmrContext?.ResultDiets[4]?.result} </div>
        <div>{bmrContext?.ResultDiets[5]?.name} : {bmrContext?.ResultDiets[5]?.result} </div>
      </div> );
  };

  const navigate = useNavigate();
  const NavigateToShowDiet = () => {
    console.log(valueAhp);
    console.log(resultDiets);
    bmrContext?.handleResultDiets(resultDiets);
    navigate("/show-diet"); // redirection to the crate diet page 
  };
  const NavigateToCreateTarget = () => {
    navigate("/create-target"); // redirection to the crate diet page 
  };


  return (
    <div>
      <form className="formCreateDiet" onSubmit={handleSubmit(onCreateCriteria)}>
        <header>
          <h1>Create Diet</h1>
        </header>
        <div className="create-diet-container">
          <h4>The amount of food</h4>
            <select {...register("amount", { required: true })}>
              <option value="1">Completely Irrelevant</option>
              <option value="3">Very Little Important</option>
              <option value="5">Little Important</option>
              <option value="7">Important </option>
              <option value="9">Very Important</option>
            </select>
            {errors.amount && (
              <p style={{ color: "red" }}>Please select one of the option</p>
            )}
            <h4>Your well-being</h4>
            <select {...register("wellBeing", { required: true })}>
              <option value="1">Completely Irrelevant</option>
              <option value="3">Very Little Important</option>
              <option value="5">Little Important</option>
              <option value="7">Important </option>
              <option value="9">Very Important</option>
            </select>
            {errors.wellBeing && (
              <p style={{ color: "red" }}>Please select one of the option</p>
            )}
            <h4>Your health</h4>
            <select {...register("health", { required: true })}>
              <option value="1">Completely Irrelevant</option>
              <option value="3">Very Little Important</option>
              <option value="5">Little Important</option>
              <option value="7">Important </option>
              <option value="9">Very Important</option>
            </select>
            {errors.health && (
              <p style={{ color: "red" }}>Please select one of the option</p>
            )}
            <h4>Price of food</h4>
            <select {...register("price", { required: true })}>
              <option value="1">Completely Irrelevant</option>
              <option value="3">Very Little Important</option>
              <option value="5">Little Important</option>
              <option value="7">Important </option>
              <option value="9">Very Important</option>
            </select>
            {errors.price && (
              <p style={{ color: "red" }}>Please select one of the option</p>
            )}
            <h4>The amount of Fat</h4>
            <select {...register("moreFat", { required: true })}>
              <option value="1">Completely Irrelevant</option>
              <option value="2">Very Little Important</option>
              <option value="5">Little Important</option>
              <option value="7">Important </option>
              <option value="9">Very Important</option>
            </select>
            {errors.moreFat && (
              <p style={{ color: "red" }}>Please select one of the option</p>
            )}
            <h4>Muscle Mass Building</h4>
            <select {...register("buildingMuscleMass", { required: true })}>
              <option value="1">Completely Irrelevant</option>
              <option value="3">Very Little Important</option>
              <option value="5">Little Important</option>
              <option value="7">Important </option>
              <option value="9">Very Important</option>
            </select>
            {errors.buildingMuscleMass && (
              <p style={{ color: "red" }}>Please select one of the option</p>
            )}
             <div>
              <input
                type="submit"
                value="Calculate Diet"
                className="submitForm"
                onClick={() => { setIsSubmitted(true)
                }}
            />
            </div>
            <div>
              <input
                type="button"
                onClick={() => { reset();
                }}
                value="Clear"
                className="buttonForm"
              />
            </div>
            <div>
              {isCorrect ? (
                <div>
                  Your answers are ok 
                </div>
              ) : (
                <div>
                  We can not find diet for you.
                  Please Change your answers.
                </div>
              )}
            </div>
            <h4> The best diets for you: </h4>
            <div>
              { showDiets() }
            </div>
            <div>
          {isSub && (
              <div>
              <input
                type="button"
                onClick={() => {                  
                  NavigateToShowDiet();
                  }}
                value="Next"
                className="buttonForm"
              />
          </div>
          )}        
        </div>
        <div>
            <input
              type="button"
              onClick={() => {                  
                NavigateToCreateTarget();
              }}
              value="Back to select your Target"
              className="buttonForm"
            />
        </div>
        </div>
      </form>
    </div>
  );
};



/*
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
*/

/*
const showDiets = () => {
    return (
      <div>

        <div>Fit Diet : {resultDiets["Fit Diet"]}</div>
        <div>Keto Diet : {resultDiets["Keto Diet"]}</div>
        <div>Mediterranean Diet : {resultDiets["Mediterranean Diet"]}</div>
        <div>Low-carb Diet : {resultDiets["Low-carb Diet"]}</div>
        <div>High Protein Diet : {resultDiets["High Protein Diet"]}</div>
        <div>Traditional Diet : {resultDiets["Traditional Diet"]}</div>
      </div> );
  };
  */