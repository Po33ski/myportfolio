import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { number } from "yup";


type InitialState = {
    value:DietCriteriaData;
};

type DietCriteriaData = {
    amount: number,
    wellBeing: number,
    health: number,
    price: number,
    moreFat: number,
    buildingMuscleMass: number,
  };

const initialState = {
    value: {
        amount: 1,
        wellBeing: 1,
        health: 1,
        price: 1,
        moreFat: 1,
        buildingMuscleMass: 1,
    } as DietCriteriaData,
} as InitialState;

const calculateLambda = (criterionsWeightList : number[], sumeOfColumnsList : number[] ) => {
    let lambda = 0;
    for(let i = 0; i < criterionsWeightList.length; i++){
       lambda = lambda + criterionsWeightList[i] * sumeOfColumnsList[i];
    };
    return lambda;
};

const checkAnswers = (answers: DietCriteriaData) : boolean => {
    
    const answersList : number[] = [
        answers.amount,
        answers.wellBeing,
        answers.health,
        answers.price,
        answers.moreFat,
        answers.buildingMuscleMass,
    ];
    
    //const answersList : number[] = answers.flatMap((answer) => )
    let i : number = -1;
    const answersMatrix : number[][] = [
        answersList,
        answersList,
        answersList,
        answersList,
        answersList,
        answersList,
    ]
    .map((rowOfAnswers : number[]) => {
        i++;
        return(
            rowOfAnswers.map((answer : number) => {
                return answersList[i]/answer;
            })
        );
    });

    const reducer = (accumulator : number, currentValue : number) => accumulator + currentValue;
    const sumeOfRows : number[] = answersMatrix.reduce((sumeOfRow : number[], rowOfAnswers : number []) => {
        sumeOfRow.push(rowOfAnswers.reduce(reducer));
        return sumeOfRow;
    }, []);
    const sumeOfMatrix : number = sumeOfRows.reduce(reducer);

    const criterionsWeight : number[] = sumeOfRows.map((value : number) => value/sumeOfMatrix);

    i = -1;
    const sumeOfColumns : number[] = answersMatrix.reduce((sumeOfColumns : number[], rowOfAnswers : number []) => {
        i++;
        sumeOfColumns[i] = 0;
        rowOfAnswers.forEach((value : number) => {sumeOfColumns[i] = sumeOfColumns[i] + value;});
        return sumeOfColumns;
    }, []);

    const lambdaMax : number = calculateLambda(criterionsWeight, sumeOfColumns);

    const factorCI : number= (lambdaMax - answersList.length)/(answersList.length - 1);

    const factorCR : number = factorCI / 1.25;

    return (factorCR > 0.15 ? true : false);
};

export const ahp = createSlice({
    name: "ahp",
    initialState,
    reducers: {
        checkValues: (state, action: PayloadAction<DietCriteriaData>) => {
           let check = checkAnswers(action.payload);
        }
    },
});


export const {checkValues} = ahp.actions;
export default ahp.reducer;
