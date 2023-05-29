import { useForm } from "react-hook-form";
import { useState } from "react";
import {ChangeBMR} from '../ChangeBMR';
import "./CalculatorPage.css";

// This interface has been used in form of the calculator
interface CalculateCaloriesData {
  gender: string;
  age: number;
  weight: number;
  height: number;
  factorPAL: number;
  target: number;
};
// I export this interface. 
// I do this so as not to redefine the interface
export interface BMRProps {
  handleBMR: (bmr : number) => void;
  bmr : number;
};

export const CalculatorPage: React.FC<BMRProps>= ({bmr, handleBMR}) => {
  const [BMR, setFactorBMR] = useState<number>(0);
  const [isSub, setIsSubmitted] = useState<boolean>(false);
  // useForm hook
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculateCaloriesData>();
  // This function calculate the factor BMR
  // calculate the BMR using Harrisa-Benedict's formula
  const onCreateCPM = (data: CalculateCaloriesData) => {
    try {
      const ageValue : number = data.age;
      const weightValue : number = data.weight;
      const heightValue : number = data.height;
      const factorPALValue : number = data.factorPAL;
      const targetValue : number = data.target;
      
      if (data.gender === "Man") {
        setFactorBMR(
          Math.round(
            (66 + 13.7 * weightValue + 5 * heightValue - 6.8 * ageValue) *
            factorPALValue +
            targetValue
          )
        );
      } else if (data.gender === "Woman") {
        setFactorBMR(
          Math.round(
            (665 + 9.6 * weightValue + 1.8 * heightValue - 4.7 * ageValue) *
            factorPALValue+
            targetValue
          )
        );
        
      } else {
        throw new Error("Something went wrong"); // It is only demostration of exception handling. 
      }
    } catch (err) {
      console.log(err);
    }
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

        <h4>What do you want?</h4>
        <select {...register("target", { required: true})}>
          <option value="-500">to lose weight</option>
          <option value="0">to keep my weight</option>
          <option value="500">to gain weight</option>
        </select>
        {errors.target && (
          <p style={{ color: "red" }}>Please select your target.</p>
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
              <ChangeBMR bmr={BMR} handleBMR={handleBMR} />
          )}
        </div>
        <div>
          <h1>You need daily {BMR} kcal</h1>
        </div>
      </form>
    </div>
  );
};
