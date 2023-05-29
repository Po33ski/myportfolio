import { useState } from "react";
import {BMRProps} from './CalculatorPage/CalculatorPage';
import { useNavigate } from 'react-router-dom';

// This component is not displayed as a separate page
// 
export const ChangeBMR: React.FC<BMRProps> = ({bmr, handleBMR}) => {
    const navigate = useNavigate();
    const NavigateToCreateDiet = () => {
        navigate("/create-diet"); // redirection to the crate diet page 
    };
    return (
        <div>
            <input
              type="button"
              onClick={() => {
                handleBMR(bmr);
                NavigateToCreateDiet();
                }}
              value="Create Diet"
              className="buttonForm"
            />
        </div>
    );
};

