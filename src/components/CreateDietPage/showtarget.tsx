import React, { useState, useReducer, useEffect } from 'react';
import {BMRProps} from '../CalculatorPage/CalculatorPage';
import './CreateDietPage.css';

interface DietOption {
    name: string;
    carbohydrates: number;
    proteins: number;
    fats: number;
  };
  // actions used with useReducer
  type Action =
   | { type: 'increase' }
   | { type: 'keep'}
   | { type: 'decrease' };
  // values used in reducer function
  type reducerState = {
    value? : number;
    showAction? : string;
  };
  
export const ShowTarget: React.FC<BMRProps> = ({bmr, handleBMR}) => {
// It is my reducer function
// it returns updated value and showAction values
    const reducer = (state : reducerState, action : Action) : reducerState => {
        switch(action.type) {
            case 'increase' :
              {
                bmr = bmr + 500; return {value : bmr, showAction : action.type};
              }
            case 'keep' :
              {
                return {value : bmr, showAction : action.type};
              }
            case 'decrease' :
              {
                bmr = bmr - 500; return {value : bmr, showAction : action.type};
              }
          };
      };
      // I define here user function dispatch and value state using useReducer 
      const [state, dispatch] = useReducer(reducer, {value : bmr, showAction : ""});
    return (
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
            {state.showAction && <h2>This is your purpose {state.value} kcal</h2>}
        </div>
    )
      
};



/*
return (
        <div>
            <div>{state.showAction}</div>
            <button 
            className="buttonForm"
            onClick={() => {
                dispatch({type : "increase"});
            }}
            > Gain Weight </button>
            <button 
            className="buttonForm"
            onClick={() => {
                dispatch({type : "keep"});
            }}
            > Keep Weight </button>
            <button 
            className="buttonForm"
            onClick={() => {
                dispatch({type : "decrease"});
            }}
            > Loose Weight </button>
            {state.showAction && <div>This is your purpose {state.value} </div>}
        </div>
    )
    */

/// <h4>{state.showAction} your weight</h4>