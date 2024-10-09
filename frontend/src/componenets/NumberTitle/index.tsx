import React from "react";
interface NumberTitleProps {
    number: number;
    color: string;
    title1: string;
    title2: string;
    bgColor: string;
}
const NumberTitle: React.FC<NumberTitleProps> = ({
    number,
    color,
    title1,
    title2,
    bgColor,
}) => {
    return (
        <>
            <div className="container w-60">
                <div
                    className="circle translate-middle-x"
                    style={{
                        border: `${color} 3px solid`,
                        background: bgColor,
                    }}
                >
                    <h1
                        className="m-0 p-0 fw-medium"
                        style={{
                            color: color,
                        }}
                    >
                        {number}
                    </h1>
                </div>

                <div className="titles mt-5 pt-5">
                    <h1
                        className="h3 text-center mt-5 fw-medium"
                        style={{ color: color }}
                    >
                        {title1}
                    </h1>
                    <h1 className="text-center fw-bold  ">{title2}</h1>
                </div>

                <hr
                    style={{
                        color: color,
                        width: "20%",
                        border: `1px solid ${color}`,
                        opacity: "1",
                    }}
                    className="mx-auto mt-4"
                />
                <p className="text-center fs-5 mx-auto mb-5">
                    CV Maker is a platform designed to help users create
                    professional and personalized curriculum vitae (CV)
                    documents and to find a job quickly and efficiently
                </p>
            </div>
        </>
    );
};

export default NumberTitle;
