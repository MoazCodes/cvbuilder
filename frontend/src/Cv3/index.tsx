import React, { useContext, useState } from 'react'
import { CvModel } from '../Interfaces/CvInterfaces';
import { UserContext } from '../Context/UserContext';
import { Link, useLocation } from 'react-router-dom';
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Document, Page, PDFDownloadLink, StyleSheet, Text, View, Link as PdfLink } from '@react-pdf/renderer';
import axios from 'axios';

interface CvProps {
    cv: CvModel;
    isEditableTemplate: boolean;
}

const txtcol: string = "#03A696";


const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: "16px", // Change from 8pt to 16px for better visibility
    },
    container: {
        width: "100%",
    },
    personalDetails: {
        marginBottom: 10,
    },
    name: {
        fontWeight: "bold",
        fontSize: "24px", // Adjust font size to match web standards
        color: txtcol, // Ensure this variable is defined
    },
    jobTitle: {
        fontSize: "18px",
        marginTop: 5,
    },
    details: {
        fontSize: "16px",
        marginTop: 5,
    },
    link: {
        color: "blue",
        textDecoration: "none",
    },
    section: {
        marginTop: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: "18px",
        fontWeight: "bold",
        color: txtcol,
    },
    content: {
        fontSize: "16px", // Larger font size for section content
        marginTop: 5,
    },
    educationDetails: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        fontSize: "16px",
    },
    schoolName: {
        fontSize: "16px",
        fontWeight: "bold",
    },
    projectHeader: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        fontWeight: "bold",
        fontSize: "16px",
        color: "#183ccc",
    },
    description: {
        fontSize: "14px",
        marginTop: 5,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: "#ececec",
        borderBottomStyle: "solid",
    },

    line: {
        borderBottomWidth: 5,
        borderBottomColor: "#ececec",  // Color of the line
        marginTop: 5,                  // Space above the line
        marginBottom: 10,              // Space below the line
    },
    indent: {
        paddingLeft: 16,
    },
    flexbetween: {
        display: "flex",
        flexDirection: "row", // Ensures items are in a row
        justifyContent: "space-between", // Distributes space between child components
        alignItems: "center", // Centers items vertically
    }
});


// Pdf document
const Pdf = ({ cv }: CvProps) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                    {/* Personal Details Section */}
                    <View style={styles.personalDetails}>
                        <Text style={styles.name}>
                            {cv.firstName + " " + cv.lastName}
                        </Text>
                        <View style={styles.flexbetween}>
                            <Text style={styles.jobTitle}>{cv.job}</Text>
                            <Text style={styles.details}>
                                {cv.city}, {cv.country}
                                {cv.email && " | "}
                                {cv.email && (
                                    <PdfLink
                                        src={`mailto:${cv.email}`}
                                        style={styles.link}
                                    >
                                        Email
                                    </PdfLink>
                                )}
                            </Text>
                        </View>
                        
                    </View>

                    <View style={styles.line}></View>

                    {/* Objective Section */}
                    {cv.objective && (<>
                        <View style={styles.section}>
                            <Text style={[styles.title,]}>
                                Objective
                            </Text>
                            <Text style={styles.content}>{cv.objective}</Text>
                        </View>
                        <View style={styles.line}></View>
                        </>
                    )}
                    


                    {/* Education Section */}
                    {cv.school && (<>
                        <View style={styles.section}>
                            <Text style={[styles.title,]}>
                                Education
                            </Text>
                            <View style={styles.educationDetails}>
                                <Text style={styles.schoolName}>
                                    {cv.school}, {cv.schoolCity}, {cv.schoolCountry}
                                </Text>
                                <Text>
                                    {cv.endSchoolDate
                                        ? `${cv.startSchoolDate.substring(0, 7)} / ${cv.endSchoolDate.substring(0, 7)}`
                                        : cv.startSchoolDate.substring(0, 7)}
                                </Text>
                            </View>
                            <Text style={styles.content}>
                                Studied{" "}
                                <Text >{cv.schoolDepartment}</Text> at{" "}
                                <Text >{cv.degree}</Text>
                            </Text>
                        </View>
                        <View style={styles.line}></View>
                        </>
                    )}
                    


                    {/* Skills Section */}
                    {cv.skills.length !== 0 && (<>
                    <View style={styles.section}>
                            <Text style={[styles.title,]}>
                                Skills
                            </Text>
                            <Text style={styles.content}>
                                {cv.skills.join(" , ")}
                            </Text>
                        </View>
                        <View style={styles.line}></View>
                    </>
                        
                    )}

                    


                    {/* Projects Section */}
                    {cv.projects.length !== 0 && (<>
                        <View style={styles.section}>
                            <Text style={[styles.title,]}>
                                Projects
                            </Text>
                            {cv.projects.map((project, index) => (
                                <View key={index}>
                                    <View style={styles.projectHeader}>
                                        <Text>{project.projectName}</Text>
                                        <Text>{project.projectDate}</Text>
                                    </View>
                                    <View style={styles.description}>
                                        {project.projectDetails.split("\n").map((line, idx) => (
                                            <Text key={idx}>
                                                • {line}
                                            </Text>
                                        ))}
                                    </View>
                                </View>
                            ))}
                            <View style={styles.line}></View>
                        </View>
                        </>
                    )}

                    

                    {/* Work Section */}
                    {cv?.experiences?.length !== 0 && (<>
                <View style={styles.section}>
                    <Text style={styles.title}>
                        Work Experience
                    </Text>
                    {cv.experiences.map((experience, index) => (
                        <View key={index} style={styles.section}>
                            <View style={styles.flexbetween}>
                                <Text>{experience.jobTitle}</Text>
                                <Text>{experience.company}</Text>
                            </View>
                            <View style={styles.flexbetween}>
                                <Text>{experience.startJobDate}</Text>
                                <Text>{experience.endJobDate}</Text>
                            </View>
                            <View style={styles.indent}>
                                {experience.jobDescription.split(/(?<=[.!?])\n/).map((line, idx) => (
                                    line && <Text key={idx} style={styles.description}>• {line}</Text>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
                <View style={styles.line}></View>
                </>
            )}

                    
                    

                    {/* Extracurricular Activities Section */}
                    {cv.extraCurricularActivities.length !== 0 && (
                        <View style={styles.section}>
                            <Text style={[styles.title,]}>
                                Extracurricular Activities
                            </Text>
                            <View style={styles.content}>
                                {cv.extraCurricularActivities.map((activity, index) => (
                                    <Text key={index}>{activity}</Text>
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            </Page>
        </Document>
    );
};


export default function Cv3({ cv, isEditableTemplate }: CvProps) {
    const { setUserCvs, userCvs, getCvsErrors, setGetCvsErrors } = useContext(UserContext);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    let location = useLocation();<View style={styles.line}></View>


    const saveCvToDatabase = () => {
        if(!getCvsErrors){
            if(cv.cvName==""){
                setGetCvsErrors("please fill the cvName , it can't be empty");
                return;
            }
            axios
            .post(`http://localhost:8000/addcv/`, cv)
            .then((res) => {
                console.log(userCvs);
                console.log(res);
                cv.cvId=res?.data?.cvId;
                setUserCvs((prevUserCvs:any) => ({
                    ...prevUserCvs,
                    data: [
                        ...(Array.isArray(prevUserCvs.data) ? prevUserCvs.data : []), // Ensure data is an array
                        cv// hereeeeeeeeeeee
                    ]
                }));
                setShowSuccess(true); // Show success alert
            })
            .catch((error) => {
                
                setShowSuccess(false); // Show success alert
                console.log(error);
                if(error?.response?.data?.error)
                    setGetCvsErrors(error.response.data.error);
                
            });}
        
            
    };

    const editCv = () => {
        axios
            .put(`http://127.0.0.1:8000/editcv/`, cv)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {

                console.log(error)
            });
    }

    const handleDownloadClick = () => {
        if (location.pathname.includes("edit")) {
            editCv();
        } else {
            saveCvToDatabase();
        }
        setIsDownloaded(true); // Set downloaded state to true
        setShowSuccess(true); // Show success alert
    };

    return (
        <>
            <div className="a4-container text-break" style={{minHeight: "550px",maxHeight:"550px"}}>
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
                                                line && <span key={idx}>{`•` + line}<br /></span>
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
                                <div className="title text-info-emphasis fw-bold" style={{ fontSize: "8px", color: txtcol }}>
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
                            <hr className='my-1' />
                        </div>
                    )}


                    {cv?.extraCurricularActivities?.length !== 0 && (
                        <div className="col-12">
                            <div className="activities mb-1">
                                <div className="title text-info-emphasis fw-bold" style={{ fontSize: "8px", color: txtcol }}>
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

                    {!isEditableTemplate && (
                        <PDFDownloadLink
                            document={<Pdf cv={cv} isEditableTemplate={false} />}
                            fileName={`${cv.cvName}.pdf`}
                            className="position-absolute  start-50 translate-middle-x"
                            style={{ bottom: "-50px" }}
                            onClick={handleDownloadClick}
                        >

                            <button className="btn btn-success">Download</button>
                        </PDFDownloadLink>
                    )}
                </div>
            </div>

            {getCvsErrors && (
                <div className="alert alert-danger position-fixed p-3" style={{ bottom: "10px", right: "10px" }}>
                    <div>
                        <div className="toast-header">
                            <strong className="me-auto">Can't save to our database</strong>
                            <small>Now</small>
                            
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

