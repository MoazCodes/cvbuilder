import React, { useContext } from 'react'
import { CvModel } from '../Interfaces/CvInterfaces';
import { UserContext } from '../Context/UserContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
interface CvProps {
  cv: CvModel;
  isEditableTemplate: boolean;
}

export default function Cv3({ cv ,isEditableTemplate}: CvProps) {
  const {setUserCvs,userCvs,getCvsErrors,setGetCvsErrors} = useContext(UserContext);
  const txtcol:string="#03A696"
  
  
  return (
    <>
      <div className="container bg-light py-3 px-2" style={{minHeight: "300px"}}>
                <div className="row g-0   ">
                    <div className="col-12">
                        <div className="text-black "  >
                            <div
                                className="  "
                                style={{ fontSize: "18px" , color:txtcol}}
                            >
                                {cv.firstName + " " + cv.lastName}
                            </div>
                            <div className='d-flex justify-content-between'>
                              <div
                                  className=" "
                                  style={{ fontSize: "14px" }}
                              >
                                  {cv.job}
                              </div>
                              <div
                                  className=" "
                                  style={{ fontSize: "12px" }}
                              >
                                  {cv.city}
                                  {cv.country && ","}
                                  {cv.country}
                                  {cv.email && " | "}
                                  {cv.email && (
                                      <Link to={`mailto: ${cv.email}`}>
                                          Email
                                      </Link>
                                  )}
                              </div>
                            </div>
                        </div>
                    </div>


                    <hr className= 'my-1'/>


                    {cv.objective.trim() && (
                        <div className="col-12">
                            <div className="">
                                <div
                                    className=""
                                    style={{ fontSize: "14px", color:txtcol  }}
                                >
                                    Objective
                                </div>
                                <p
                                    className="content m-0 mb-1 text-break text-black"
                                    style={{ fontSize: "12px" }}
                                >
                                    {cv.objective}
                                </p>
                            </div>
                        </div>
                    )}

                    <hr className= 'my-1'/>
        
                    {cv.school.trim() && (
                        <div className="col-12">
                            <div className="">
                                <div
                                    className=""
                                    style={{ fontSize: "14px",color:txtcol }}
                                >
                                    Education
                                </div>
                                <div
                                    className=""
                                    style={{ fontSize: "12px" }}
                                >
                                    <div className=" d-flex justify-content-between ">
                                        <span className=" ">
                                            {cv.city
                                                ? `${cv.school}, `
                                                : cv.school}
                                            {cv?.schoolCountry
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
                                <p
                                    style={{ fontSize: "45%" }}
                                    className="m-0 mb-1 text-black"
                                >
                                    Studied{" "}
                                    <span className="fw-bold">
                                        {cv.schoolDepartment}
                                    </span>{" "}
                                    at{" "}
                                    <span className="fw-bold">{cv.degree}</span>
                                </p>
                            </div>
                        </div>
                    )}
                    <hr className='fs-2 fw-bold'/>

                    {cv?.skills?.length !== 0 && (
                        <div className="col-12">
                            <div className="skills mb-1">
                                <div
                                    className="title text-info-emphasis fw-bold"
                                    style={{ fontSize: "55%" }}
                                >
                                    Skills
                                </div>
                                <p
                                    className="content d-flex m-0 text-black"
                                    style={{ fontSize: "45%" }}
                                >
                                    {cv.skills.join(" | ")}
                                </p>
                            </div>
                        </div>
                    ) }
                    <hr className='fs-2 fw-bold'/>

                    {cv?.projects?.length !== 0 && (
                        <div className="col-12">
                            <div className="projects">
                                <div
                                    className="title text-info-emphasis fw-bold "
                                    style={{ fontSize: "55%" }}
                                >
                                    Projects
                                </div>

                                {cv.projects.map((project) => (
                                    <div
                                        className="project mb-1"
                                        style={{ fontSize: "50%" }}
                                    >
                                        <div
                                            className="title  d-flex justify-content-between fw-medium "
                                            style={{ color: "#183ccc" }}
                                        >
                                            <div className="name ">
                                                {project.projectName}
                                            </div>
                                            <div className="date">
                                                {project.projectDate}
                                            </div>
                                        </div>

                                        <div className="description text-break text-black">
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
                    ) }
                    <hr className='fs-2 fw-bold'/>

                    {cv?.extraCurricularActivities?.length !== 0 && (
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
                                    {cv?.extraCurricularActivities?.map(
                                        (activity, index) => (
                                            <span
                                                key={index}
                                                className="text-black"
                                            >
                                                {activity}
                                                <br />
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    ) }
                </div>
            </div>
            {getCvsErrors&& (<div className="alert alert-danger position-fixed  p-3" style={{bottom:"10px",right:"10px"}}>
                <div >
                    <div className="toast-header">
                        
                        <strong className="me-auto">Can't save to our database</strong>
                        <small>Now</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        {getCvsErrors}
                    </div>
                </div>
            </div>)}
            
    
    </>
  )
}
