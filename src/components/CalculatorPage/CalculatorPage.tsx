import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useState, useContext} from "react";
import "./CalculatorPage.css";
import { AppContext, appContextType, IappContextData, ICalculateCaloriesData } from '../../App';
// This interface has been used in form of the calculator


export const CalculatorPage: React.FC = () => {
  const [BMR, setFactorBMR] = useState<number>(0);
  const [isSub, setIsSubmitted] = useState<boolean | null>(false);
  const [calcData, setCalcData] = useState<ICalculateCaloriesData>({
    gender: "Man",
    age: 18,
    weight: 80,
    height: 180,
    factorPAL: 1
  });
  const bmrContext = useContext<appContextType | null>(AppContext);
  let bmr : number = bmrContext !== null ? bmrContext.BMR.bmr : 0;
  //const bmr = () : number => bmrContext !== null ? bmrContext.BMR.bmr : 0;

  const navigate = useNavigate();
  const NavigateToCreateTarget = () => {
    bmrContext?.handleBMR(BMR);
    bmrContext?.handleCalculateCaloriesData(calcData);
    console.log(`Is BMR: ${BMR}`);
    console.log(`Is bmr: ${bmr}`);
    console.log(`Is bmrContext.BMR.bmr: ${ bmrContext?.BMR.bmr}`);

    navigate("/create-target"); // redirection to the crate diet page 
};
  // useForm hook
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ICalculateCaloriesData>();
  // This function calculate the factor BMR
  // calculate the BMR using Harrisa-Benedict's formula
  const onCreateCPM = (data: ICalculateCaloriesData) => {
    try {
      
      const ageValue : number = data.age;
      const weightValue : number = data.weight;
      const heightValue : number = data.height;
      const factorPALValue : number = data.factorPAL;
      
      if (data.gender === "Man") {
        setFactorBMR(
          Math.round(
            ((66 + 13.7 * weightValue + 5 * heightValue - 6.8 * ageValue) *
            factorPALValue)
          )
        );
      } else if (data.gender === "Woman") {
        setFactorBMR(
          Math.round(
            ((665 + 9.6 * weightValue + 1.8 * heightValue - 4.7 * ageValue) *
            factorPALValue)
          )
        );
        
      } else {
        throw new Error("Something went wrong"); // It is only demostration of exception handling. 
      }
    } catch (err) {
      console.log(err);
    }
    setCalcData(data);
    console.log(data);
  };
  // The calculator component returns the validation form
  // it's the main visible part of the calorie calculator
  return (
    <div>
      <form className="formCalculator" onSubmit={handleSubmit(onCreateCPM)}>
        <header>
          <h1>Calorie Calculator</h1>
        </header>

        <h4>What is your gender?</h4>
        <td className="gender-radio-group">
          <label>
            Male
            <input type="radio" {...register("gender", { required: true })} value="Man" />
          </label>
          <label>
            Female
            <input type="radio" {...register("gender", { required: true })} value="Woman" />
          </label>
        </td>
        {errors.gender && (
          <p style={{ color: "red" }}>Please select gender.</p>
        )}
        
        <input
          type="number"
          placeholder="Age..."
          {...register("age", { required: true, min: 16 })}
        />
        {errors.age && (
          <p style={{ color: "red" }}>You must add your age.</p>
        )}

        <input
          type="number"
          placeholder="Weight..."
          {...register("weight", { required: true, min: 30 })}
        />
        {errors.weight && (
          <p style={{ color: "red" }}>You must add your weight.</p>
        )}

        <input
          type="number"
          placeholder="Height..."
          {...register("height", { required: true, min: 100 })}
        />
        {errors.height && (
          <p style={{ color: "red" }}>You must add your height.</p>
        )}

        <h4>How active are you?</h4>
        <select {...register("factorPAL", { required: true })}>
          <option value="1.0">Sedentary: little or no exercise</option>
          <option value="1.4">Light: exercise 1-3 times/week</option>
          <option value="1.6">Moderate: exercise 4-5 times/week</option>
          <option value="1.75">
            Active: daily exercise or intense exercise 3-4 times/week
          </option>
          <option value="2">Very Active: intense exercise 6-7 times/week</option>
          <option value="2.2">Extra Active: very intense exercise daily</option>
        </select>
        {errors.factorPAL && (
          <p style={{ color: "red" }}>Please select your activity.</p>
        )}
        <div>
          <input
            type="submit"
            value="Calculate"
            className="submitForm"
            onClick={() => setIsSubmitted(true)}
          />
        </div>
        <div>
          {isSub && (
            <input
              type="button"
              onClick={() => { reset();
                setIsSubmitted(false);
                setFactorBMR(0);
              }}
              value="Clear"
              className="buttonForm"
            />
          )}
        </div>
        <div>
          {isSub && (
              <div>
              <input
                type="button"
                onClick={() => {                  
                  NavigateToCreateTarget();
                  }}
                value="Next"
                className="buttonForm"
              />
          </div>
          )}
        </div>
        <div>
          <h1>You need daily {BMR} kcal</h1>
        </div>
      </form>
    </div>
  );
};

// This piece of code won't be finally used
/*
<h4>What do you want?</h4>
        <select {...register("target")}>
          <option value={-500}>to lose weight</option>
          <option value={0}>to keep my weight</option>
          <option value={500}>to gain weight</option>
        </select>
        {errors.target && ( 
          <p style={{ color: "red" }}>Please select your target.</p>
        )}
*/