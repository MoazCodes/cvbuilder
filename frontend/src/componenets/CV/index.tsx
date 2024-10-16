import ReactPDF, {
    Document,
    Page,
    PDFDownloadLink,
    PDFViewer,
    StyleSheet,
    Text,
    View,
    Link as PdfLink,
} from "@react-pdf/renderer";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { Experience, Project } from "../../Interfaces/CvInterfaces";
import { CvModel } from "../../Interfaces/CvInterfaces";
import { isEditable } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
interface CvProps {
    cv: CvModel;
    isEditableTemplate: boolean;
}

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
                        <Text style={styles.jobTitle}>{cv.job}</Text>
                        <Text style={styles.details}>
                            {cv.city}, {cv.country} | {cv.email && (
                                <PdfLink
                                    src={`mailto:${cv.email}`}
                                    style={styles.link}
                                >
                                    {cv.email}
                                </PdfLink>
                            )}
                        </Text>
                    </View>

                    {/* Divider between sections */}
                    <View style={styles.line} />

                    {/* Objective Section */}
                    {cv.objective.trim() && (
                        <View style={styles.section}>
                            <Text style={styles.title}>Objective</Text>
                            <Text style={styles.content}>{cv.objective}</Text>
                        </View>
                    )}

                    {/* Education Section */}
                    {cv.school.trim() && (
                        <View style={styles.section}>
                            <Text style={styles.title}>Education</Text>
                            <View style={styles.educationDetails}>
                                <Text style={styles.schoolName}>
                                    {cv.school}, {cv.schoolCity}, {cv.schoolCountry}
                                </Text>
                                <Text style={styles.schoolDate}>
                                    {cv.endSchoolDate
                                        ? `${cv.startSchoolDate.substring(0, 7)} / ${cv.endSchoolDate.substring(0, 7)}`
                                        : cv.startSchoolDate.substring(0, 7)}
                                </Text>
                            </View>
                            <Text style={styles.educationContent}>
                                Studied <Text style={styles.bold}>{cv.schoolDepartment}</Text> at <Text style={styles.bold}>{cv.degree}</Text>
                            </Text>
                        </View>
                    )}

                    {/* Skills Section */}
                    {cv.skills.length !== 0 && (
                        <View style={styles.section}>
                            <Text style={styles.title}>Skills</Text>
                            <Text style={styles.content}>
                                {cv.skills.join(" | ")}
                            </Text>
                        </View>
                    )}

                    {/* Work Experience Section */}
                    {cv.experiences.length !== 0 && (
                        <View style={styles.section}>
                            <Text style={styles.title}>Work Experience</Text>
                            {cv.experiences.map((experience, index) => (
                                <View key={index} style={styles.experience}>
                                    <View style={styles.flexbetween}>
                                        <Text>{experience.jobTitle}</Text>
                                        <Text>{experience.company}</Text>
                                    </View>
                                    <View style={styles.flexbetween}>
                                        <Text>{experience.startJobDate}</Text>
                                        <Text>{experience.endJobDate}</Text>
                                    </View>
                                    <Text style={styles.content}>
                                        {experience.jobDescription.split("\n").map((line, idx) => (
                                            <Text key={idx}>• {line}{"\n"}</Text>
                                        ))}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}

                    

                    {/* Projects Section */}
                    {cv.projects.length !== 0 && (
                        <View style={styles.section}>
                            <Text style={styles.title}>Projects</Text>
                            {cv.projects.map((project, index) => (
                                <View key={index} style={styles.project}>
                                    <View style={styles.projectHeader}>
                                        <Text>{project.projectName}</Text>
                                        <Text>{project.projectDate}</Text>
                                    </View>
                                    <Text style={styles.description}>
                                        {project.projectDetails.split("\n").map((line, idx) => (
                                            <Text key={idx}>• {line}{"\n"}</Text>
                                        ))}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Extracurricular Activities Section */}
                    {cv.extraCurricularActivities.length !== 0 && (
                        <View style={styles.section}>
                            <Text style={styles.title}>Extracurricular Activities</Text>
                            {cv.extraCurricularActivities.map((activity, index) => (
                                <Text key={index} style={styles.content}>{activity}{"\n"}</Text>
                            ))}
                        </View>
                    )}
                </View>
            </Page>
        </Document>
    );
};
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: "15pt",
        lineHeight: 1.3, // Adjust for better readability
    },
    container: {
        width: "100%",
    },
    personalDetails: {
        textAlign: "center",
        marginBottom: 10,
    },
    name: {
        fontWeight: "bold",
        fontSize: "20pt",
        color: "#055160", // Example color
    },
    jobTitle: {
        fontWeight: "bold",
        fontSize: "15pt",
        marginTop: 5,
    },
    details: {
        fontSize: "11pt",
        marginTop: 5,
    },
    link: {
        color: "blue",
        textDecoration: "none",
    },
    section: {
        marginTop: 5,
        marginBottom: 5,
        borderBottom: " 1px",
    },
    title: {
        fontSize: "13pt",
        fontWeight: "bold",
        color: "#055160",
        marginBottom: 3,
    },
    content: {
        fontSize: "10pt",
        marginTop: 5,
    },
    educationDetails: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    schoolName: {
        textAlign: "center",
        textDecoration: "underline",
        fontSize: "10pt",
        fontWeight: "bold",
    },
    schoolDate: {
        fontSize: "10pt",
    },
    educationContent: {
        fontSize: "10pt",
    },
    bold: {
        fontWeight: "bold",
    },
    project: {
        marginBottom: 10,
    },
    projectHeader: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        fontWeight: "bold",
        fontSize: "10pt",
        color: "#183ccc",
    },
    description: {
        fontSize: "10pt",
        marginTop: 5,
    },
    activity: {
        marginBottom: 3,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: "#ececec", // Color of the border
        borderBottomStyle: "solid", // Style of the border (solid, dashed, etc.)
    },
    experience: {
        marginBottom: 10, // Ensures spacing between experiences
    },
    line: {
        borderBottomWidth: 5,
        borderBottomColor: "#ececec",  // Color of the line
        marginTop: 5,                  // Space above the line
        marginBottom: 10,              // Space below the line
    },
    flexbetween: {
        display: "flex",
        flexDirection: "row", // Ensures items are in a row
        justifyContent: "space-between", // Distributes space between child components
        alignItems: "center", // Centers items vertically
    }
});

const Cv = ({ cv ,isEditableTemplate}: CvProps) => {
    let location = useLocation();
    const navigate = useNavigate();
    const {setUserCvs,userCvs,getCvsErrors,setGetCvsErrors} = useContext(UserContext);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (getCvsErrors) {
            const timer = setTimeout(() => {
                setGetCvsErrors(null); // Clear the error after 3 seconds
            }, 3000);

            
            return () => clearTimeout(timer);
        }
       
    }, [getCvsErrors]);


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
                setUserCvs((prevUserCvs:any) => ({
                    ...prevUserCvs,
                    data: [
                        ...(Array.isArray(prevUserCvs.data) ? prevUserCvs.data : []), // Ensure data is an array
                        res.data// hereeeeeeeeeeee
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

    const editCv = ()=>{
        axios
            .put(`http://127.0.0.1:8000/editcv/`,cv)
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
        
    };

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false); // Hide success alert after 3 seconds
                
            }, 3000);
            if (showSuccess&&!getCvsErrors) 
                navigate('/mycvs');
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);


    return (
        <>
            <div className="container bg-light overflow-hidden" style={{minHeight: "550px",maxHeight:"550px"}}>
                <div className="row">
                    <div className="col-12">
                        <div className="personalDetails text-center mt-1 text-black">
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
                            <div
                                className="details "
                                style={{ fontSize: "50%" }}
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
                                    className="content m-0 mb-1 text-break text-black"
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
                                    className="content text-center fw-bold text-black"
                                    style={{ fontSize: "45%" }}
                                >
                                    <div className="schoolDetails d-flex justify-content-between ">
                                        <span className="schoolName text-decoration-underline">
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
                                                        {`•` + line}
                                                        <br />
                                                    </span>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) }

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

            
            {getCvsErrors&& (<div className="alert alert-danger position-fixed  p-3" style={{bottom:"10px",right:"10px"}}>
                <div >
                    <div className="toast-header">
                        
                        <strong className="me-auto">Can't save to our database</strong>
                        <small>Now</small>
                        
                    </div>
                    <div className="toast-body">
                        {getCvsErrors}
                    </div>
                </div>
            </div>)}

            {showSuccess&& (<div className="alert alert-success position-fixed  p-3" style={{bottom:"10px",right:"10px"}}>
                <div >
                    <div className="toast-header">
                        
                        <strong className="me-auto">Congratulations</strong>
                        <small>Now</small>
                        
                    </div>
                    <div className="toast-body">
                        {"downloaded Succesfully"}
                    </div>
                </div>
            </div>)}
            
        </>
    );
};

export default Cv;
