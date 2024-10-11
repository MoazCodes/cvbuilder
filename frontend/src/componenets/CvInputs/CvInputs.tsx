import React, { useEffect, useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import Skill from "../Skill/Skill";
import "./styles.css";

const CvInputs = () => {
    const [goSteps, setGoSteps] = useState(0);
    const [skills, setSkills] = useState<string[]>([]);
    const [skill, setSkill] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        job: "",
        city: "",
        country: "",
        email: "",
        objective: "",
        degree: "",
        school: "",
        startSchoolDate: "",
        endSchoolDate: "",
        skills: [] as string[],
    });

    let handleSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSkill(e.target.value);
    };
    let handleInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    };

    let addSkill = (skill: string) => {
        if (skill.trim()) {
            setFormData({ ...formData, skills: [...formData.skills, skill] });
        }
        setSkill("");
        console.log(formData);
    };

    let deleteSkill = (index: number) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter((item, i) => i !== index),
        });
    };

    useEffect(() => {}, [formData]);
    return (
        <>
            <div className="pt-5 mt-5  container  vh-100">
                <Stepper
                    activeStep={goSteps}
                    connectorStateColors={true}
                    connectorStyleConfig={{
                        completedColor: "var(--main-color)", // Color for completed connectors
                        disabledColor: "gray", // Color for disabled connectors
                        activeColor: "var(--main-color)", // Color for the active connector
                        size: "3px", // Thickness of the connector
                        style: "margin: 4px; border: 2px solid white;", // Additional styles
                    }}
                >
                    <Step
                        style={{
                            backgroundColor:
                                goSteps >= 0 ? "var(--main-color)" : "#aaa",
                        }}
                        label="Personal Details"
                    />
                    <Step
                        style={{
                            backgroundColor:
                                goSteps >= 1 ? "var(--main-color)" : "#aaa",
                        }}
                        label="Objective"
                    />
                    <Step
                        style={{
                            backgroundColor:
                                goSteps >= 2 ? "var(--main-color)" : "#aaa",
                        }}
                        label="Education"
                    />
                    <Step
                        style={{
                            backgroundColor:
                                goSteps >= 3 ? "var(--main-color)" : "#aaa",
                        }}
                        label="Skills"
                    />
                    <Step
                        style={{
                            backgroundColor:
                                goSteps >= 4 ? "var(--main-color)" : "#aaa",
                        }}
                        label="Projects"
                    />
                </Stepper>
                <div className="container mt-5">
                    <div className="row position-relative">
                        <div className="col-md-8">
                            {goSteps === 0 && (
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="firstName"
                                                    className="form-label"
                                                >
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control "
                                                    id="firstName"
                                                    placeholder="Ahmed"
                                                    onChange={handleInput}
                                                    name="firstName"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="lastName"
                                                    className="form-label"
                                                >
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="lastName"
                                                    placeholder="Khaled"
                                                    name="lastName"
                                                    onChange={handleInput}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="job"
                                                    className="form-label"
                                                >
                                                    Profession
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control "
                                                    id="job"
                                                    placeholder="web developer"
                                                    name="job"
                                                    onChange={handleInput}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="city"
                                                    className="form-label"
                                                >
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="city"
                                                    placeholder="Giza"
                                                    name="city"
                                                    onChange={handleInput}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="country"
                                                    className="form-label"
                                                >
                                                    Country
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="country"
                                                    placeholder="Egypt"
                                                    name="country"
                                                    onChange={handleInput}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="email"
                                                    className="form-label"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="example@abc.com"
                                                    name="email"
                                                    onChange={handleInput}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="nextBtn mt-5 text-end ">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => setGoSteps(1)}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}

                            {goSteps === 1 && (
                                <div className="container-fluid">
                                    <label
                                        htmlFor="objective "
                                        className="mt-5"
                                    >
                                        Objective
                                    </label>
                                    <textarea
                                        className="objective w-100 mt-3 form-control"
                                        id="objective"
                                        name="objective"
                                        onChange={handleInput}
                                    ></textarea>
                                    <div className="nextBtn mt-5 text-end ">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => setGoSteps(2)}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}

                            {goSteps === 2 && (
                                <div className="container-fluid">
                                    <div className="row h-100">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="degree"
                                                    className="form-label"
                                                >
                                                    Degree
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="degree"
                                                    placeholder="Bachelor of Science"
                                                    name="degree"
                                                    onChange={handleInput}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="school"
                                                    className="form-label"
                                                >
                                                    School/University
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="school"
                                                    placeholder="Helwan University"
                                                    name="school"
                                                    onChange={handleInput}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="startSchoolDate"
                                                    className="form-label"
                                                >
                                                    School/University
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="startSchoolDate"
                                                    placeholder="September"
                                                    name="startSchoolDate"
                                                    onChange={handleInput}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="endSchoolDate"
                                                    className="form-label"
                                                >
                                                    School/University
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="endSchoolDate"
                                                    name="endSchoolDate"
                                                    onChange={handleInput}
                                                />
                                            </div>
                                        </div>

                                        <div className="nextBtn mt-5 text-end ">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => setGoSteps(3)}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {goSteps === 3 && (
                                <div className="container-fluid  py-3 min-vh-70 ">
                                    <div className="row h-100 g-4">
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                className="form-control mt-3"
                                                id="skill"
                                                name="skill"
                                                value={skill}
                                                onChange={handleSkill}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <div
                                                className="mt-3 btn btn-success w-100"
                                                onClick={() => addSkill(skill)}
                                            >
                                                Add Skill
                                            </div>
                                        </div>
                                        <div className="col-12 d-flex flex-wrap ">
                                            {formData.skills.map(
                                                (skill, index) => (
                                                    <Skill
                                                        key={index}
                                                        skill={skill}
                                                        index={index}
                                                        deleteSkill={
                                                            deleteSkill
                                                        }
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <div className="nextBtn mt-5 text-end">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => setGoSteps(4)}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}

                            {goSteps === 4 && (
                                <div className="container-fluid">
                                    <div className="row h-100">
                                        <div className="nextBtn mt-5 text-end ">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => setGoSteps(5)}
                                            >
                                                submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-md-1"></div>
                        <div
                            className="col-md-3 bg-info position-absolute end-0 "
                            style={{ height: "428px" }}
                        >
                            .
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CvInputs;
