import React, { useEffect, useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import Skill from "../Skill/Skill";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ExtraCurricularActivity from "../extracurricularActivities";
import Cv from "../CV";
import StepperLevel from "../stepperLevels";
import { Experience, Project } from "../../Interfaces/CvInterfaces";
import axios from "axios";

const CvInputs = () => {
    const [goSteps, setGoSteps] = useState(0);
    const [activity, setActivity] = useState("");
    const [skill, setSkill] = useState("");
    const [projectAddition, setProjectAddition] = useState(false);
    const [workAddition, setWorkAddition] = useState(false);
    const [project, setProject] = useState({
        projectName: "",
        projectDate: "",
        projectDetails: "",
    });

    const [experience, setExperience] = useState({
        jobTitle: "",
        startJobDate: "",
        endJobDate: "",
        jobDescription: "",
        company: "",
    });

    const [formData, setFormData] = useState({
        userId: 1,
        cvId:1,
        cvName:"aaa",
        firstName: "",
        lastName: "",
        job: "",
        city: "",
        country: "",
        email: "",
        objective: "",
        degree: "",
        school: "",
        schoolDepartment: "",
        schoolCity: "",
        schoolCountry: "",
        startSchoolDate: "",
        endSchoolDate: "",
        skills: [] as string[],
        projects: [] as Project[], //project={ projectName: string ,projectDate: string ,projectDetails: string ,}
        experiences: [] as Experience[], //experience={ jobTitle: string ,startJobDate: string ,endJobDate: string ,jobDescription: string,company: string,}
        extraCurricularActivities: [] as string[]
    });

    

    let handleSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSkill(e.target.value);
    };

    let handleActivity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setActivity(e.target.value);
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

    let addActivity = (activity: string) => {
        if (activity.trim()) {
            setFormData({
                ...formData,
                extraCurricularActivities: [
                    ...formData.extraCurricularActivities,
                    `• ` + activity,
                ],
            });
        }
        setActivity("");
        console.log(formData);
    };

    let deleteSkill = (index: number) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter((item, i) => i !== index),
        });
    };

    let deleteActvity = (index: number) => {
        setFormData({
            ...formData,
            extraCurricularActivities:
                formData.extraCurricularActivities.filter(
                    (item, i) => i !== index
                ),
        });
    };

    let handleProject = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value,
        });
    };

    let handleJob = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setExperience({ ...experience, [e.target.name]: e.target.value });
    };

    let addProject = (project: Project) => {
        if (project.projectName.trim() !== "") {
            setFormData({
                ...formData,
                projects: [...formData.projects, project],
            });

            setProject({
                projectName: "",
                projectDate: "",
                projectDetails: "",
            });
        }
        setProjectAddition(!projectAddition);
        console.log(formData);
    };

    let addExperience = (experience: Experience) => {
        if (
            experience.jobTitle.trim() !== "" &&
            experience.company.trim() !== ""
        ) {
            setFormData({
                ...formData,
                experiences: [...formData.experiences, experience],
            });

            setExperience({
                jobTitle: "",
                startJobDate: "",
                endJobDate: "",
                jobDescription: "",
                company: "",
            });
        }
        setWorkAddition(!workAddition);
        console.log(formData);
    };

    let deleteProject = (index: number) => {
        setFormData({
            ...formData,
            projects: formData.projects.filter((item, i) => i !== index),
        });
    };

    let deleteExperience = (index: number) => {
        setFormData({
            ...formData,
            experiences: formData.experiences.filter((item, i) => i !== index),
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

                    <Step
                        style={{
                            backgroundColor:
                                goSteps >= 5 ? "var(--main-color)" : "#aaa",
                        }}
                        label="Work experience"
                    />

                    <Step
                        style={{
                            backgroundColor:
                                goSteps >= 6 ? "var(--main-color)" : "#aaa",
                        }}
                        label="ExtraCurricular Activities"
                    />
                </Stepper>
                <div className="container mt-5">
                    <div className="row position-relative">
                        <div className="col-md-8">
                            {goSteps === 0 && (
                                <div className="container-fluid">
                                    <div className="row">
                                    <div className="col-md-12">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="cvName"
                                                    className="form-label"
                                                >
                                                    Cv Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control "
                                                    id="cvName"
                                                    placeholder="AhmedCv_1"
                                                    onChange={handleInput}
                                                    name="cvName"
                                                />
                                            </div>
                                        </div>
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

                                    <StepperLevel
                                        currentLevel={goSteps}
                                        setGoSteps={setGoSteps}
                                    />
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
                                        style={{ minHeight: "150px" }}
                                        className="objective w-100 mt-3 form-control"
                                        id="objective"
                                        name="objective"
                                        onChange={handleInput}
                                    ></textarea>
                                    <StepperLevel
                                        currentLevel={goSteps}
                                        setGoSteps={setGoSteps}
                                    />
                                </div>
                            )}

                            {goSteps === 2 && (
                                <div className="container-fluid">
                                    <div className="row h-100">
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
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="degree"
                                                    className="form-label"
                                                >
                                                    Faculty
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="degree"
                                                    placeholder="Faculty of Science"
                                                    name="degree"
                                                    onChange={handleInput}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="schoolDepartment"
                                                    className="form-label"
                                                >
                                                    Department
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="schoolDepartment"
                                                    placeholder="AI"
                                                    name="schoolDepartment"
                                                    onChange={handleInput}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="schoolCity"
                                                    className="form-label"
                                                >
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="schoolCity"
                                                    placeholder="Giza"
                                                    name="schoolCity"
                                                    onChange={handleInput}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="schoolCountry"
                                                    className="form-label"
                                                >
                                                    Country
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="schoolCountry"
                                                    placeholder="Egypt"
                                                    name="schoolCountry"
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
                                                    Start Date
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
                                                    End Date
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

                                        <StepperLevel
                                            currentLevel={goSteps}
                                            setGoSteps={setGoSteps}
                                        />
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
                                    <StepperLevel
                                        currentLevel={goSteps}
                                        setGoSteps={setGoSteps}
                                    />
                                </div>
                            )}

                            {goSteps === 4 && (
                                <div className="container-fluid">
                                    <div className="row h-100">
                                        {projectAddition === true ? (
                                            <>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label
                                                            htmlFor=""
                                                            className="form-label"
                                                        >
                                                            Project Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Job Helper"
                                                            name="projectName"
                                                            onChange={
                                                                handleProject
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label
                                                            htmlFor=""
                                                            className="form-label"
                                                        >
                                                            Project Date
                                                        </label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            name="projectDate"
                                                            onChange={
                                                                handleProject
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="mb-3">
                                                        <label
                                                            htmlFor=""
                                                            className="form-label"
                                                        >
                                                            Project Details
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            placeholder="Projet description"
                                                            name="projectDetails"
                                                            style={{
                                                                minHeight:
                                                                    "150px",
                                                            }}
                                                            onChange={
                                                                handleProject
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 d-flex align-items-center justify-content-end my-3 ">
                                                    <div className="">
                                                        <button
                                                            className="btn btn-success"
                                                            onClick={() =>
                                                                addProject(
                                                                    project
                                                                )
                                                            }
                                                        >
                                                            Submit Project
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            formData.projects.length > 0 && (
                                                <>
                                                    {formData.projects.map(
                                                        (project, idx) => (
                                                            <>
                                                                <div className="col-12 mb-3 border d-flex justify-content-between align-items-center p-3">
                                                                    <div>
                                                                        <div className="title">
                                                                            {
                                                                                project.projectName
                                                                            }
                                                                        </div>
                                                                        <div className="date">
                                                                            {
                                                                                project.projectDate
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="projectIcons">
                                                                        <div className="delete">
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    faTrash
                                                                                }
                                                                                role="button"
                                                                                onClick={() =>
                                                                                    deleteProject(
                                                                                        idx
                                                                                    )
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="edit"></div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    )}
                                                </>
                                            )
                                        )}
                                        <button
                                            className="btn btn-info"
                                            onClick={() =>
                                                setProjectAddition(
                                                    !projectAddition
                                                )
                                            }
                                        >
                                            Add Project
                                        </button>

                                        <StepperLevel
                                            currentLevel={goSteps}
                                            setGoSteps={setGoSteps}
                                        />
                                    </div>
                                </div>
                            )}

                            {goSteps === 5 && (
                                <>
                                    <div className="container-fluid">
                                        <div className="row h-100">
                                            {workAddition === true ? (
                                                <>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label
                                                                htmlFor=""
                                                                className="form-label"
                                                            >
                                                                Job Title
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Web Developer"
                                                                name="jobTitle"
                                                                onChange={
                                                                    handleJob
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label
                                                                htmlFor=""
                                                                className="form-label"
                                                            >
                                                                Company Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Facebook"
                                                                name="company"
                                                                onChange={
                                                                    handleJob
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label
                                                                htmlFor=""
                                                                className="form-label"
                                                            >
                                                                Start Date
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                name="startJobDate"
                                                                onChange={
                                                                    handleJob
                                                                }
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label
                                                                htmlFor=""
                                                                className="form-label"
                                                            >
                                                                End Date
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                name="endJobDate"
                                                                onChange={
                                                                    handleJob
                                                                }
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="mb-3">
                                                            <label
                                                                htmlFor=""
                                                                className="form-label"
                                                            >
                                                                Description
                                                            </label>
                                                            <textarea
                                                                className="form-control"
                                                                placeholder="jobDescription"
                                                                name="jobDescription"
                                                                onChange={
                                                                    handleJob
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12  d-flex align-items-center justify-content-end mt-3">
                                                        <div className="">
                                                            <button
                                                                className="btn btn-success"
                                                                onClick={() =>
                                                                    addExperience(
                                                                        experience
                                                                    )
                                                                }
                                                            >
                                                                Submit Project
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                formData.experiences.length >
                                                    0 && (
                                                    <>
                                                        {formData.experiences.map(
                                                            (
                                                                experience,
                                                                idx
                                                            ) => (
                                                                <>
                                                                    <div className="col-12 mb-3 border d-flex justify-content-between align-items-center p-3">
                                                                        <div>
                                                                            <div className="title">
                                                                                {
                                                                                    experience.jobTitle
                                                                                }
                                                                            </div>
                                                                            <div className="dates d-flex">
                                                                                <div className="startDate me-2">
                                                                                    {
                                                                                        experience.startJobDate
                                                                                    }
                                                                                </div>
                                                                                <div className="endDate">
                                                                                    {
                                                                                        experience.endJobDate
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="projectIcons">
                                                                            <div className="delete">
                                                                                <FontAwesomeIcon
                                                                                    icon={
                                                                                        faTrash
                                                                                    }
                                                                                    role="button"
                                                                                    onClick={() =>
                                                                                        deleteExperience(
                                                                                            idx
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className="edit"></div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        )}
                                                    </>
                                                )
                                            )}
                                            <button
                                                className="btn btn-info mt-3"
                                                onClick={() =>
                                                    setWorkAddition(
                                                        !workAddition
                                                    )
                                                }
                                            >
                                                Add Work Experience
                                            </button>

                                            <StepperLevel
                                                currentLevel={goSteps}
                                                setGoSteps={setGoSteps}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {goSteps === 6 && (
                                <>
                                    <div className="container-fluid  py-3 min-vh-70 ">
                                        <div className="row h-100 g-4">
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    className="form-control mt-3"
                                                    id="activity"
                                                    name="activity"
                                                    value={activity}
                                                    onChange={handleActivity}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <div
                                                    className="mt-3 btn btn-success w-100"
                                                    onClick={() =>
                                                        addActivity(activity)
                                                    }
                                                >
                                                    Add Activity
                                                </div>
                                            </div>
                                            <div className="col-12 d-flex flex-wrap ">
                                                {formData.extraCurricularActivities.map(
                                                    (skill, index) => (
                                                        <ExtraCurricularActivity
                                                            key={index}
                                                            activity={skill}
                                                            index={index}
                                                            deleteActivity={
                                                                deleteActvity
                                                            }
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <StepperLevel
                                            currentLevel={goSteps}
                                            setGoSteps={setGoSteps}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="col-md-1"></div>
                        <div
                            className="col-md-3 bg-light position-absolute end-0 text-dark p-0"
                            style={{ minHeight: "428px" }}
                        >
                            
                            <Cv cv={formData} isEditableTemplate={false}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CvInputs;
