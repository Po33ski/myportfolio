"use client";

import {configureStore} from '@reduxjs/toolkit';
import authReducer from "./features/auth-slice";
import ahpfReducer from "./features/auth-slice";

export const store = configureStore({
    reducer: {
        authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/*
let lastAction = "";

const initialStateValue = {bmr : 0, actionType : ""};
export const bmrSlice = createSlice({
    name : "bmr",
    initialState : {value: initialStateValue},
    reducers: {
        setBmr: (state, action) => {
            state.value = action.payload;
        },
        changeBmr: (state, action) => {
                if(state.value.actionType !== lastAction){
                    state.value = action.payload;
                    lastAction = state.value.actionType;
                } else {
                    //
                }
            },
        }
    }
);

export const {setBmr, changeBmr} = bmrSlice.actions;

export const store = configureStore({
    reducer: {
        bmr: bmrSlice.reducer,
    },
});

export default bmrSlice.reducer;
*/
/*
if(lastAction !== 'increase') {
                      bmr = bmr + 500;
                      lastAction = 'increase';
                      handleBMR(bmr);
                    }  
 */

/*
reducers: {
        setBmr: (state, action) => {
            state.value.bmr = action.payload;
        },
        increaseBmr: (state, action) => {
            state.value.bmr = action.payload + state.value.bmr;
        },
        keepBmr: (state, action) => {
            state.value = action.payload;
        },
        decreaseBmr: (state, action) => {
            state.value.bmr = state.value.bmr - action.payload;
        },
    }
*/


/*
type Action =
   | { type: 'increase' }
   | { type: 'keep'}
   | { type: 'decrease' };
  // values used in reducer function
  type reducerState = {
    value? : number;
    showAction? : string;
  };
*/