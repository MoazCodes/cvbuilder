import React, { useRef } from "react";
import { Link } from "react-router-dom";

interface project {
    projectName: string;
    projectDate: string;
    projectDetails: string;
}

interface experience {
    jobTitle: string;
    startJobDate: string;
    endJobDate: string;
    jobDescription: string;
    company: string;
}
interface CvProps {
    cv: cv;
}

interface cv {
    firstName: string;
    lastName: string;
    job: string;
    city: string;
    country: string;
    email: string;
    objective: string;
    degree: string;
    school: string;
    schoolDepartment: string;
    schoolCity: string;
    schoolCountry: string;
    startSchoolDate: string;
    endSchoolDate: string;
    skills: string[];
    projects: project[];
    experiences: experience[];
    extracurricularActivities: string[];
}

const Cv = ({ cv }: CvProps) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 ">
                    <div className="personalDetails text-center mt-1">
                        <div
                            className="name fw-bold "
                            style={{ fontSize: "80%" }}
                        >
                            {cv.firstName + " " + cv.lastName}
                        </div>
                        <div
                            className="jobTitle fw-bold"
                            style={{ fontSize: "60%" }}
                        >
                            {cv.job}
                        </div>
                        <div className="details " style={{ fontSize: "50%" }}>
                            {cv.city}
                            {cv.country && ","}
                            {cv.country}
                            {cv.email && " | "}
                            {cv.email && (
                                <Link to={`mailto: ${cv.email}`}>Email</Link>
                            )}
                        </div>
                    </div>
                </div>

                {cv.objective.trim() && (
                    <div className="col-12">
                        <div className="objective">
                            <div
                                className="title text-info-emphasis fw-bold"
                                style={{ fontSize: "55%" }}
                            >
                                Objective
                            </div>
                            <p
                                className="content m-0 mb-1"
                                style={{ fontSize: "45%" }}
                            >
                                {cv.objective}
                            </p>
                        </div>
                    </div>
                )}

                {cv.school.trim() && (
                    <div className="col-12">
                        <div className="education">
                            <div
                                className="title text-info-emphasis fw-bold"
                                style={{ fontSize: "55%" }}
                            >
                                Education
                            </div>
                            <div
                                className="content text-center fw-bold "
                                style={{ fontSize: "45%" }}
                            >
                                <div className="schoolDetails d-flex justify-content-between">
                                    <span className="schoolName text-decoration-underline">
                                        {cv.city ? `${cv.school}, ` : cv.school}
                                        {cv.schoolCountry
                                            ? `${cv.schoolCity}, `
                                            : cv.schoolCity}
                                        {cv.schoolCountry}{" "}
                                    </span>
                                    <span className="schoolDate">
                                        {cv.endSchoolDate
                                            ? `${cv.startSchoolDate.substring(
                                                  0,
                                                  7
                                              )}/${cv.endSchoolDate.substring(
                                                  0,
                                                  7
                                              )}`
                                            : cv.startSchoolDate.substring(
                                                  0,
                                                  7
                                              )}
                                    </span>
                                </div>
                            </div>
                            <p style={{ fontSize: "45%" }} className="m-0 mb-1">
                                Studied{" "}
                                <span className="fw-bold">
                                    {cv.schoolDepartment}
                                </span>{" "}
                                at <span className="fw-bold">{cv.degree}</span>
                            </p>
                        </div>
                    </div>
                )}

                {cv.skills.length !== 0 && (
                    <div className="col-12">
                        <div className="skills mb-1">
                            <div
                                className="title text-info-emphasis fw-bold"
                                style={{ fontSize: "55%" }}
                            >
                                Skills
                            </div>
                            <p
                                className="content d-flex m-0"
                                style={{ fontSize: "45%" }}
                            >
                                {cv.skills.join(" | ")}
                            </p>
                        </div>
                    </div>
                )}

                {cv.projects.length !== 0 && (
                    <div className="col-12">
                        <div className="projects">
                            <div
                                className="title text-info-emphasis fw-bold"
                                style={{ fontSize: "55%" }}
                            >
                                Projects
                            </div>

                            {cv.projects.map((project) => (
                                <div
                                    className="project mb-1"
                                    style={{ fontSize: "50%" }}
                                >
                                    <div className="title  d-flex justify-content-between fw-medium text-black">
                                        <div className="name ">
                                            {project.projectName}
                                        </div>
                                        <div className="date">
                                            {project.projectDate}
                                        </div>
                                    </div>

                                    <div className="description ">
                                        {project.projectDetails
                                            .split("\n")
                                            .map((line, index) => (
                                                <span key={index}>
                                                    {`• ` + line}
                                                    <br />
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {cv.extracurricularActivities.length !== 0 && (
                    <div className="col-12">
                        <div className="activities mb-1">
                            <div
                                className="title text-info-emphasis fw-bold"
                                style={{ fontSize: "55%" }}
                            >
                                Extracurricular Activities
                            </div>
                            <div
                                className="content m-0"
                                style={{ fontSize: "45%" }}
                            >
                                {cv.extracurricularActivities.map(
                                    (activity, index) => (
                                        <span key={index}>
                                            {activity}
                                            <br />
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cv;
