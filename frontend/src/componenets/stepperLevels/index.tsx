import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
interface stepperLevelProps {
    currentLevel: number;
    setGoSteps: (currentLevel: number) => void;
}
const StepperLevel = ({ currentLevel, setGoSteps }: stepperLevelProps) => {
    return (
        <div className="nextBtn mt-5 d-flex justify-content-between ">
            {currentLevel > 0 && (
                <div className="d-flex justify-content-start w-100">
                    <button
                        className="btn btn-primary"
                        onClick={() => setGoSteps(currentLevel - 1)}
                    >
                        back
                    </button>
                </div>
            )}
            {currentLevel < 6 ? (
                <div className="d-flex justify-content-end w-100">
                    <button
                        className="btn btn-primary "
                        onClick={() => setGoSteps(currentLevel + 1)}
                    >
                        Next
                    </button>
                </div>
            ) : (
                <div className="d-flex justify-content-end w-100">
                    <button className="btn btn-primary " onClick={() => {}}>
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default StepperLevel;
