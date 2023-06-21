import React, { useState, useReducer, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './TargetPage.css';
import { AppContext, appContextType } from '../../App';
// dodac custom component w ktorym bedzie sprawdzane czy useReducer dostaje odpowiednie wartosci
// zrobic to uzywajac ponizszych type


  // actions used with useReducer
  type Action =
   | { type: 'increase' }
   | { type: 'keep'}
   | { type: 'decrease' };
  // values used in reducer function
  type reducerState = {
    value : number;
    showAction? : string;
  };
  
export const CreateTargetPage: React.FC = () => {
// It is my reducer function
// it returns updated value and showAction values
  const [BMR, setFactorBMR] = useState<number>(0);
  const bmrContext = useContext<appContextType | null>(AppContext);
  let bmr : number = bmrContext !== null ? bmrContext.BMR.bmr : 0;
  const bmrF = () : number => bmrContext !== null ? bmrContext.BMR.bmr : 0;
  const origBmr : number = bmrF();
  let lastAction = "";

  const navigate = useNavigate();
  const NavigateToCreateDiet = () => {
      bmrContext?.handleBMR(BMR);
      console.log(`Is BMR: ${BMR}`);
      console.log(`Is bmr: ${bmr}`);
      console.log(`Is bmrContext.BMR.bmr: ${ bmrContext?.BMR.bmr}`);

      navigate("/create-diet"); // redirection to the crate diet page 
  };
  const NavigateToCalculateDiet = () => {
    navigate("/calculator"); // redirection to the crate diet page 
};
  
    const reducer = (state : reducerState, action : Action) : reducerState => {
        if(action.type !== lastAction)
        {
            switch(action.type) {
                case 'increase' :
                    {
                         bmr = bmr + 500; 
                         setFactorBMR(bmr); 
                         lastAction = action.type; 
                         return {value : bmr, showAction : action.type};
                    }
                case 'keep' :
                    {
                        bmr = origBmr ; 
                        setFactorBMR(origBmr);
                        lastAction = action.type; 
                        return {value : origBmr, showAction : action.type};
                    }
                case 'decrease' :
                    {
                        bmr = bmr - 500; 
                        setFactorBMR(bmr);
                        lastAction = action.type; 
                        return {value : bmr, showAction : action.type};
                    }
                  };  
        } else 
            return {value : bmr, showAction : action.type};
    };

      // I define here user function dispatch and value state using useReducer 
      const [state, dispatch] = useReducer(reducer, {value : bmr, showAction : ""});
    return (
        <form>
            <header>
                <h1>What is your Target?</h1>
            </header>
            <div>
            <div className='h4' >
              {
                state.showAction && (<>{state.showAction} your weight</>)
              }
            </div>
            <input
              type="button"
              onClick={() => {
                dispatch({type : "increase"});
              }}
              value="Gain Weight"
              className="buttonForm"
            />
            <input
              type="button"
              onClick={() => {
                dispatch({type : "keep"});
              }}
              value="Keep Weight"
              className="buttonForm"
            />
            <input
              type="button"
              onClick={() => {
                dispatch({type : "decrease"});
              }}
              value="Loose Weight"
              className="buttonForm"
            />
            {state.showAction && <h2>This is your purpose "BMR" {BMR} kcal</h2>}
            {state.showAction && <h2>This is your purpose  "state.value" {state.value} kcal</h2>}
            {state.showAction && <h2>This is your purpose  "bmr" {bmr} kcal</h2>}
            {state.showAction && <h2>This is your purpose  "bmr" {bmrContext?.BMR.bmr} kcal</h2>}
            <div>
              <input
                type="button"
                onClick={() => {                  
                  NavigateToCreateDiet();
                  }}
                value="Next"
                className="buttonForm"
              />
            </div>
            <div>
              <input
                type="button"
                onClick={() => {                  
                  NavigateToCalculateDiet();
                  }}
                value="Previous"
                className="buttonForm"
              />
            </div>
        </div>
        </form>

    );
};