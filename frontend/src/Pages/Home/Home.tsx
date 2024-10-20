import React from "react";

import "./style.css";
import NumberTitle from "../../componenets/NumberTitle";
import Card from "../../componenets/Card/Card";

import DataForHowToUseSection from "../../staticData/DataForHowToUseSection.json";

import DataForFeaturesSection from "../../staticData/DataForFeaturesSection.json";
import { Link } from "react-router-dom";
import Templates from "../Templates/Templates";
import TypedComponent from "../../componenets/Typed/Typed";

const Home = () => {
    return (
        <>
            <section id="Hero" className="hero vh-100 text-white" >
                <div className="container w-80">
                    <div className="row">
                        <div className="col-md-8 col-sm-12 d-flex flex-column justify-content-center vh-100  wow animate__backInLeft" data-wow-duration="0.7s">
                            <div className="content">
                                <h1
                                    style={{
                                        fontSize: "clamp(34px, 6vw, 64px)",
                                    }}
                                    className="mb-5 fw-bold"
                                >
                                    Create your professional
                                    <br />
                                    Resume with CV maker
                                </h1>

                                <h5
                                    style={{ color: "hsl(246,  6%, 55%)" }}
                                    className="mb-5"
                                >
                                    Create your very own professional Resume and
                                    download it within 15 minutes.
                                </h5>
                                
                                <Link
                                    className="btn px-5 py-2 newCvBtn"
                                    to={"/templates"}
                                >
                                    Create New CV
                                </Link>
                            </div>
                        </div>

                        <div className="col-md-4 d-flex flex-column justify-content-center position-relative ">
                            <div
                                className="cvImage wow animate__backInUp"
                                data-wow-duration="0.7s"
                            >
                                <img
                                    src="/assets/cv.jpg"
                                    alt="cv"
                                    className="w-100 d-sm-none d-md-block"
                                />
                                <img
                                    src="/assets/computer-city-lines--dark.svg"
                                    alt="cv"
                                    className="w-100 d-sm-none d-md-block position-absolute end-100 top-50"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================================================================= */}

            {/* ================================================================= */}

            <section className="howToUse pb-5 position-relative" id="HowToUse">
                <NumberTitle
                    number={1}
                    color={"var(--blue-500)"}
                    bgColor={"var(--blue-100)"}
                    title1={"Now Boarding, Express"}
                    title2={"How CV Maker works"}
                />
                <div className="container-md pb-5">
                    <div className="row g-md-4 g-sm-4">
                        {DataForHowToUseSection.map((cardData, i) => (
                            <>
                                <Card
                                    title={cardData.title}
                                    content={cardData.content}
                                    color={"blue"}
                                    svg={cardData.svg}
                                    key={i}
                                    duration={i}
                                />
                            </>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================================================================= */}
            <section className="features pb-5 position-relative" id="Features">
                <NumberTitle
                    number={2}
                    color={"var(--green-500)"}
                    bgColor={"var(--green-100)"}
                    title1={"Leaving the Station"}
                    title2={"Features designed to help you"}
                />

                {/* ================================================================= */}

                <div className="container-md pb-5">
                    <div className="row g-md-4 g-sm-4">
                        {DataForFeaturesSection.map((cardData, i) => (
                            <>
                                <Card
                                    title={cardData.title}
                                    content={cardData.content}
                                    color={"green"}
                                    svg={cardData.svg}
                                    key={i}
                                    duration={0.5*i}
                                />
                            </>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
