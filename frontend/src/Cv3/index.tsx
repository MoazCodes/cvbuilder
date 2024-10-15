import React, { useContext } from 'react'
import { CvModel } from '../Interfaces/CvInterfaces';
import { UserContext } from '../Context/UserContext';
import { Link } from 'react-router-dom';
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

interface CvProps {
    cv: CvModel;
    isEditableTemplate: boolean;
}

export default function Cv3({ cv, isEditableTemplate }: CvProps) {
    const { setUserCvs, userCvs, getCvsErrors, setGetCvsErrors } = useContext(UserContext);
    const txtcol: string = "#03A696";

    return (
        <>
            <div className="a4-container">
                <div className="row g-0">
                    <div className="col-12">
                        <div className="text-black">
                            <div className='fw-bold' style={{ fontSize: "10px", color: txtcol }}>
                                {cv.firstName + " " + cv.lastName}
                            </div>
                            <div className="d-flex justify-content-between">
                                <div style={{ fontSize: "8px" }}>{cv.job}</div>
                                <div style={{ fontSize: "8px" }}>
                                    {cv.city}
                                    {cv.country && ","} {cv.country}
                                    {cv.email && " | "}
                                    {cv.email && <Link to={`mailto: ${cv.email}`}>Email</Link>}
                                </div>
                            </div>
                        </div>
                        <hr className="my-1" />
                    </div>


                    {cv.objective && (
                        <div className="col-12">
                            <div className='fw-bold' style={{ fontSize: "8px", color: txtcol }}>Objective</div>
                            <p style={{ fontSize: "8px", whiteSpace: "pre-wrap", margin: "0px" }}>{cv.objective}</p>
                            <hr className="my-1" />

                        </div>
                    )}


                    {cv.school.trim() && (
                        <div className="col-12">
                            <div className='fw-bold' style={{ fontSize: "8px", color: txtcol }}>Education</div>
                            <div style={{ fontSize: "8px" }}>
                                <div className="d-flex justify-content-between">
                                    <span>
                                        {cv.school}, {cv.schoolCity}, {cv.schoolCountry}
                                    </span>
                                    <span className="schoolDate">
                                        {cv.endSchoolDate
                                            ? `${cv.startSchoolDate.substring(0, 7)} / ${cv.endSchoolDate.substring(0, 7)}`
                                            : cv.startSchoolDate.substring(0, 7)}
                                    </span>
                                </div>
                            </div>
                            <p style={{ fontSize: "7px" }} className="m-0  text-black">
                                Studied <span className="fw-bold">{cv.schoolDepartment}</span> at{" "}
                                <span className="fw-bold">{cv.degree}</span>
                            </p>
                            <hr className='my-1' />

                        </div>
                    )}


                    {cv?.skills?.length !== 0 && (
                        <div className="col-12">
                            <div className="skills mb-1">
                                <div className="fw-bold  " style={{ fontSize: "8px", color: txtcol }}>
                                    Skills
                                </div>
                                <p className="content d-flex m-0 text-black" style={{ fontSize: "7px" }}>
                                    {cv.skills.join(" , ")}
                                </p>
                            </div>
                            <hr className='my-1' />

                        </div>

                    )}


                    {cv?.projects?.length !== 0 && (
                        <div className="col-12">
                            <div className="projects">
                                <div className="title  fw-bold" style={{ fontSize: "8px", color: txtcol }}>
                                    Projects
                                </div>

                                {cv.projects.map((project, index) => (

                                    <div key={index} className="col-12 mb-1 ms-1" style={{ fontSize: "7px" }}>
                                        <div className="title d-flex justify-content-between fw-medium" style={{ color: "#183ccc" }}>
                                            <div className="name">{project.projectName}</div>
                                            <div className="date">{project.projectDate}</div>
                                        </div>
                                        <div className="ms-2 text-break text-black">
                                            {project.projectDetails.split(/(?<=[.!?])\n/).map((line, idx) => (
                                                line && <span key={idx}>{`• ` + line}<br /></span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr className='my-1' />
                        </div>
                    )}


                    {cv?.experiences?.length !== 0 && (
                        <div className="col-12">
                            <div className="experiences mb-1">
                                <div className="title text-info-emphasis fw-bold" style={{ fontSize: "8px" }}>
                                    Work Experience
                                </div>
                                {cv.experiences.map((experience, index) => (
                                    <div key={index} className="col-12 mb-1 ms-1" style={{ fontSize: "7px" }}>
                                        <div className="title d-flex justify-content-between fw-medium" style={{ color: "#183ccc" }}>
                                            <div className="jobTitle">{experience.jobTitle}</div>
                                            <div className="company">{experience.company}</div>
                                        </div>
                                        <div className="d-flex justify-content-between" style={{ fontSize: "7px" }}>
                                            <div className="startDate">{experience.startJobDate}</div>
                                            <div className="endDate">{experience.endJobDate}</div>
                                        </div>
                                        <div className="ms-2 text-break text-black">
                                            {experience.jobDescription.split(/(?<=[.!?])\n/).map((line, idx) => (
                                                line && <span key={idx}>{`• ` + line}<br /></span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr className='my-1'/>
                        </div>
                    )}


                    {cv?.extraCurricularActivities?.length !== 0 && (
                        <div className="col-12">
                            <div className="activities mb-1">
                                <div className="title text-info-emphasis fw-bold" style={{ fontSize: "8px" }}>
                                    Extracurricular Activities
                                </div>
                                <div className="content m-0" style={{ fontSize: "7px" }}>
                                    {cv?.extraCurricularActivities?.map((activity, index) => (
                                        <span key={index} className="text-black">
                                            {activity}<br />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {getCvsErrors && (
                <div className="alert alert-danger position-fixed p-3" style={{ bottom: "10px", right: "10px" }}>
                    <div>
                        <div className="toast-header">
                            <strong className="me-auto">Can't save to our database</strong>
                            <small>Now</small>
                            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div className="toast-body">
                            {getCvsErrors}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

